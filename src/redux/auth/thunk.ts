import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser } from '../../shared/api/auth'

export const fetchAuthThunk = createAsyncThunk('auth/fetchTokens', async (credentials: { email: string; password: string }) => {
  try {
    const { email, password } = credentials
    const response = await registerUser(email, password)
    return response.accessToken
  } catch (error) {
    throw error
  }
})
