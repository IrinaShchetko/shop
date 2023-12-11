import { createSlice } from '@reduxjs/toolkit'
import { checkAuthThunk, loginThunk, registrationThunk, logoutThunk, refreshThunk } from './thunk'

interface AuthState {
  refreshToken?: string
  accessToken?: string
  authorization?: boolean
  error?: unknown
}

const initialState: AuthState = {
  refreshToken: localStorage.getItem('refreshToken') || undefined,
  accessToken: localStorage.getItem('accessToken') || undefined,
}

export const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(loginThunk.fulfilled.match, (state, action) => {
      if (action.payload.success) {
        localStorage.setItem('refreshToken', action.payload.data.refreshToken)
        localStorage.setItem('accessToken', action.payload.data.accessToken)
        return {
          accessToken: action.payload.data.accessToken,
          refreshToken: action.payload.data.refreshToken,
          authorization: true,
        }
      } else {
        return {
          error: action.payload.error,
          authorization: false,
        }
      }
    })
    builder.addMatcher(loginThunk.rejected.match, (state, action) => {
      return {
        error: action.error.message,
        authorization: false,
      }
    })

    builder.addMatcher(registrationThunk.fulfilled.match, (state, action) => {
      // Handle successful registration
      return state // Update as needed
    })
    builder.addMatcher(registrationThunk.rejected.match, (state, action) => {
      // Handle registration failure
      return state
    })

    builder.addMatcher(logoutThunk.fulfilled.match, state => {
      // Handle successful logout
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      return {
        ...state,
        refreshToken: undefined,
        accessToken: undefined,
        authorization: false,
      }
    })
    builder.addMatcher(logoutThunk.rejected.match, (state, action) => {
      // Handle logout failure
      return {
        ...state,
        error: action.error.message,
        authorization: false,
      }
    })

    builder.addMatcher(refreshThunk.fulfilled.match, (state, action) => {
      // Handle successful token refresh
      if (state.accessToken) {
        localStorage.setItem('accessToken', state.accessToken)
        return {
          ...state,
          accessToken: state.accessToken,
        }
      }
      return state
    })
    builder.addMatcher(refreshThunk.rejected.match, (state, action) => {
      // Handle token refresh failure
      return {
        ...state,
        error: action.error.message,
        authorization: false,
      }
    })

    builder.addMatcher(checkAuthThunk.fulfilled.match, (state, action) => {
      state.authorization = action.payload
    })
    builder.addMatcher(checkAuthThunk.rejected.match, state => {
      state.authorization = false
    })
  },
})
