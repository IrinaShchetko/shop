import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { MongoClient } from 'mongodb'

const url =
    'mongodb+srv://irinashetko92:3215eras@cluster0.ty7dnme.mongodb.net/zebra?retryWrites=true&w=majority'
const mongoClient = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_PRIVATE_ACCESS, {
            expiresIn: '1m',
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_PRIVATE_REFRESH, {
            expiresIn: '1d',
        })
        return {
            accessToken,
            refreshToken,
        }
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_PRIVATE_ACCESS)
            return userData
        } catch (e) {
            return null
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_PRIVATE_REFRESH)
            return userData
        } catch (e) {
            return null
        }
    }
    async saveToken(userId, refreshToken) {
        try {
            await mongoClient.connect()
            const db = mongoClient.db('zebra')
            const tokenCollection = db.collection('tokens')
            const tokenData = await tokenCollection.findOne({ user: userId })

            if (tokenData) {
                await tokenCollection.updateOne(
                    { user: userId },
                    { $set: { refreshToken: refreshToken } },
                )
            } else {
                await tokenCollection.insertOne({ user: userId, refreshToken })
            }
        } catch (error) {
            console.error('Ошибка в saveToken:', error)
            throw error
        } finally {
            await mongoClient.close()
        }
    }
    async removeToken(refreshToken) {
        try {
            await mongoClient.connect()
            const db = mongoClient.db('zebra')
            const tokenCollection = db.collection('tokens')
            const result = await tokenCollection.deleteOne({ refreshToken })
            return result.deletedCount > 0
        } catch (error) {
            console.error('Ошибка в removeToken:', error)
            throw error
        } finally {
            await mongoClient.close()
        }
    }
    async getTokenByUserId(userId) {
        try {
            await mongoClient.connect()
            const db = mongoClient.db('zebra')
            const tokenCollection = db.collection('tokens')
            const tokenData = await tokenCollection.findOne({ user: userId })
            return tokenData
        } catch (error) {
            console.error('Ошибка в getTokenByUserId:', error)
            throw error
        } finally {
            await mongoClient.close()
        }
    }
}

class UserService {
    async registration(email, password) {
        try {
            await mongoClient.connect()
            const db = mongoClient.db('zebra')
            const userCollection = db.collection('users')
            const candidate = await userCollection.findOne({ email })

            if (candidate) {
                throw new Error(`Пользователь с ${email} уже существует`)
            }

            const hashPassword = await bcrypt.hash(password, 3)
            const user = await userCollection.insertOne({
                email,
                password: hashPassword,
            })

            const tokenService = new TokenService()
            const tokens = tokenService.generateTokens({ userId: user.insertedId })
            await tokenService.saveToken(user.insertedId, tokens.refreshToken)

            return {
                ...tokens,
                user: { _id: user.insertedId, email },
            }
        } catch (error) {
            console.error('Ошибка в registration:', error)
            throw error
        } finally {
            await mongoClient.close()
        }
    }

    async login(email, password) {
        try {
            await mongoClient.connect()
            const db = mongoClient.db('zebra')
            const userCollection = db.collection('users')
            const user = await userCollection.findOne({ email })

            if (!user) {
                throw new Error('Пользователь не найден')
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Неверный пароль');
            }

            const tokenService = new TokenService()
            const existingTokenData = await tokenService.getTokenByUserId(user._id)

            let tokens
            if (existingTokenData) {
                // Если токен существует, используйте его
                tokens = {
                    accessToken: existingTokenData.accessToken,
                    refreshToken: existingTokenData.refreshToken,
                }
            } else {
                // Если токен не существует, создайте новые
                tokens = tokenService.generateTokens({ userId: user._id })
                await tokenService.saveToken(user._id, tokens.refreshToken)
            }

            return {
                ...tokens,
                user: { _id: user._id, email },
            }
        } catch (error) {
            console.error('Ошибка в login:', error)
            throw error
        } finally {
            await mongoClient.close()
        }
    }
    async logout(refreshToken) {
        const tokenService = new TokenService()
        const success = await tokenService.removeToken(refreshToken)
        return { success }
    }
    async refresh(refreshToken) {
        try {
            if (!refreshToken) {
                throw new Error('Отсутствует токен обновления')
            }

            const tokenService = new TokenService()
            const userData = tokenService.validateRefreshToken(refreshToken)

            if (!userData) {
                throw new Error('Токен обновления недействителен')
            }
            const newTokens = tokenService.generateTokens({ userId: userData.userId })
            await tokenService.saveToken(userData.userId, newTokens.refreshToken)

            return {
                ...newTokens,
                user: { _id: userData.userId },
            }
        } catch (error) {
            console.error('Ошибка в refresh:', error)
            throw error
        }
    }
}

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body
            const userService = new UserService()
            const userData = await userService.registration(email, password)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 10 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            return res.json(userData)
        } catch (e) {
            console.error(e)
            return res
                .status(500)
                .json({ error: e.message || 'Внутренняя ошибка сервера' })
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userService = new UserService()
            const userData = await userService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 10 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            return res.json(userData)
        } catch (e) {
            console.error(e)
            return res
                .status(500)
                .json({ error: e.message || 'Внутренняя ошибка сервера' })
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userService = new UserService()
            const result = await userService.logout(refreshToken)

            if (result.success) {
                res.clearCookie('refreshToken')
                return res.json({ success: true })
            } else {
                return res.json({ success: false })
            }
        } catch (e) {
            console.error(e)
            return res
                .status(500)
                .json({ error: e.message || 'Внутренняя ошибка сервера' })
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userService = new UserService()
            const userData = await userService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 10 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            return res.json(userData)
        } catch (e) {
            console.error(e)
            return res
                .status(500)
                .json({ error: e.message || 'Внутренняя ошибка сервера' })
        }
    }
}
const userController = new UserController()

export const routerAuth = Router()
routerAuth.post('/registration', userController.registration)
routerAuth.post('/login', userController.login)
routerAuth.post('/logout', userController.logout)
routerAuth.post('/refresh', userController.refresh)

