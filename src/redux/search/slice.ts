import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: { searchValue: '' },
  reducers: {
    setSearcher: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
  },
})

export const { setSearcher } = searchSlice.actions
