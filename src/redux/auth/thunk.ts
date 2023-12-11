import { createAsyncThunk } from '@reduxjs/toolkit'
import authApi from '../../shared/api/auth'

// Login Thunk
export const loginThunk = createAsyncThunk('auth/login', async ({ login, password }: { login: string; password: string }) => {
  console.log('Логин thunk executed')
  const response = await authApi.login(login, password)
  return response
})

// Registration Thunk
export const registrationThunk = createAsyncThunk('auth/registration', async ({ login, password }: { login: string; password: string }) => {
  console.log('Received values in registrationThunk:', login, password)
  const response = await authApi.registration(login, password)
  return response
})

// Logout Thunk
export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await authApi.logout()
})

// Token Refresh Thunk
export const refreshThunk = createAsyncThunk('auth/refresh', async () => {
  const response = await authApi.refresh()
  return response
})

// Check Auth Thunk
export const checkAuthThunk = createAsyncThunk('auth/checkAuth', async () => {
  if (!localStorage.getItem('accessToken')) {
    return false
  }

  try {
    await authApi.refresh()
    return true
  } catch (error) {
    return false
  }
})
