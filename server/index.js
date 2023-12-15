import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { router } from './routes/routes.js'
import { MongoClient } from 'mongodb'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'

// для использования переменных из .env
config()
const url = `${process.env.MONGO_DB}?connectTimeoutMS=30000`
const mongoClient = new MongoClient(url)

const app = express()
app.use(express.static('assets'))
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
)

app.use(bodyParser.json())
app.use(cookieParser())

const connectToDatabase = async () => {
  try {
    await mongoClient.connect()
    console.log('Подключено к базе данных')
  } catch (err) {
    console.error('Ошибка подключения к базе данных:', err)
    throw new Error('Внутренняя ошибка сервера')
  }
}

connectToDatabase()
  .then(() => {
    app.use(router)
    const port = process.env.PORT || 5500

    app.listen(port, () => {
      console.log(`Listening on Port: ${port}`)
    })
  })
  .catch(err => {
    console.error('Error starting the server:', err)
  })
