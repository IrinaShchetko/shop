// auth.tsx
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../shared/hooks/useRedux'
import { loginThunk, registrationThunk } from '../../redux'
import { AuthForm } from '../../components/authForm'

export const Authorization: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const loginRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const seePassword = () => {
    setShowPassword(prevPassword => !prevPassword)
  }

  const dispatch = useAppDispatch()
  const navigation = useNavigate()

  const handleRegistration = async () => {
    console.log('Registration button clicked')
    const login = loginRef.current?.value || ''
    const password = passwordRef.current?.value || ''

    try {
      await dispatch(registrationThunk({ login, password }))
      console.log('Registration')
      navigation('/')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const handleLogin = async () => {
    console.log('Дщпшт button clicked')
    const login = loginRef.current?.value
    const password = passwordRef.current?.value

    if (login && password) {
      try {
        await dispatch(loginThunk({ login, password }))
        navigation('/')
      } catch (error) {
        console.error('Login failed:', error)
      }
    }
  }

  return <AuthForm handleSubmit={handleRegistration} showPassword={showPassword} seePassword={seePassword} />
}
