import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload
      state.user = user
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
    clearAuthData: state => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
    },
  },
})

export const { setAuthData, clearAuthData } = authSlice.actions
export default authSlice.reducer
