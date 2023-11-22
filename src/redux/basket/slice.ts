import { createSlice } from '@reduxjs/toolkit'
import { GoodsProps } from '../../shared/api/types'
import { addToBasketAsync, fetchBasketThunk, removeFromBasketAsync } from '.'

interface BasketState {
  items: GoodsProps[]
  status: 'none' | 'loading' | 'succeeded' | 'failed'
}

const initialState: BasketState = {
  items: [],
  status: 'none',
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBasketThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(addToBasketAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items.push(action.payload)
      })
      .addCase(removeFromBasketAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = state.items.filter(item => item._id !== action.payload)
      })
      .addCase(fetchBasketThunk.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchBasketThunk.rejected, state => {
        state.status = 'failed'
        // state.error = action.error.message ?? 'An error occurred'
      })
  },
})
