import React, { useState, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../redux/auth/slice'
import { loginUser, registerUser } from '../../shared/api/auth'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { AuthForm } from '../../components/authForm'
import { usePrivate } from '../../shared/context/PrivateContext'

export const Authorization: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch()
  const navigation = useNavigate()

  const seePassword = () => {
    setShowPassword(prevPassword => !prevPassword)
  }
  const { privateVisibility, updateBasketCount } = usePrivate()

  const handleRegistration = async () => {
    try {
      const userData = await registerUser(login, password)
      dispatch(setAuthData(userData))

      localStorage.setItem('accessToken', userData.accessToken)
      if (userData.statusCode === 200) {
        navigation(-1)
      } else {
        console.error('Login Error: Unexpected status code', userData.statusCode)
      }
    } catch (error) {
      console.error('Authentication Error:', error)
    }
  }

  const handleLogin = async () => {
    try {
      const userData = await loginUser(login, password)
      dispatch(setAuthData(userData))
      localStorage.setItem('accessToken', userData.accessToken)
      if (userData.statusCode === 200) {
        navigation(-1)
      } else {
        console.error('Login Error: Unexpected status code', userData.statusCode)
      }
    } catch (error) {
      console.error('Authentication Error:', error)
    }
  }

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogOut = () => {
    localStorage.clear()
    updateBasketCount()
  }

  return (
    <>
      {privateVisibility ? (
        <div className={styles.account}>
          <h2 className={styles.greeting}>Welcome to your Zebra account</h2>
          <p className={styles.info}>Here you can see all the information about your purchases</p>
          <button className={styles.logout} onClick={handleLogOut}>
            log out
          </button>
        </div>
      ) : (
        <AuthForm
          seePassword={seePassword}
          showPassword={showPassword}
          login={login}
          password={password}
          handleLoginChange={handleLoginChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
          handleRegistration={handleRegistration}
        />
      )}
    </>
  )
}
