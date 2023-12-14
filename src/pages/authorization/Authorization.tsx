import React, { useState, ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../../redux/auth/slice'
import { loginUser, registerUser } from '../../shared/api/auth'
import { useNavigate } from 'react-router-dom'
import styles from './auth.module.css'
import { AuthForm } from '../../components/authForm'

export const Authorization: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch()
  const navigation = useNavigate()

  const seePassword = () => {
    setShowPassword(prevPassword => !prevPassword)
  }

  const handleRegistration = async () => {
    try {
      const userData = await registerUser(email, password)
      dispatch(setAuthData(userData))

      localStorage.setItem('accessToken', userData.accessToken)
      if (userData.statusCode === 200) {
        navigation('/')
      } else {
        console.log('Registration Error: Unexpected status code', userData.statusCode)
      }
    } catch (error) {
      console.error('Authentication Error:', error)
    }
  }

  const handleLogin = async () => {
    try {
      const userData = await loginUser(email, password)
      dispatch(setAuthData(userData))
      localStorage.setItem('accessToken', userData.accessToken)
      if (userData.statusCode === 200) {
        navigation('/')
      } else {
        console.error('Login Error: Unexpected status code', userData.statusCode)
      }
    } catch (error) {
      console.error('Authentication Error:', error)
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const handleAccountVisability = () => {
    const accessToken = localStorage.getItem('accessToken')
    setIsAuthenticated(!!accessToken)
  }

  useEffect(() => {
    handleAccountVisability()
  }, [])
  const handleLogOut = () => {
    localStorage.clear()
    setIsAuthenticated(false)
  }

  return (
    <>
      {isAuthenticated ? (
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
          email={email}
          password={password}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
          handleRegistration={handleRegistration}
        />
      )}
    </>
  )
}
