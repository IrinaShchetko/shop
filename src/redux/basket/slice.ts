import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GoodsProps } from '../../shared/api/types'
import { addToBasketAsync, fetchBasketThunk, removeFromBasketAsync, updateQuantityAsync } from '.'
//TODO
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
  reducers: {
    updateQuantity: (state, action: PayloadAction<{ itemId: string; count: number }>) => {
      const { itemId, count } = action.payload
      const itemToUpdate = state.items.find(item => item._id === itemId)
      if (itemToUpdate) {
        itemToUpdate.count = count
      }
    },
    clearBasket: state => {
      state.items = []
    },
  },
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
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { itemId, count } = action.payload
        const itemToUpdate = state.items.find(item => item._id === itemId)

        if (itemToUpdate) {
          itemToUpdate.count = count
        }
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
