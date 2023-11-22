import { createAsyncThunk } from '@reduxjs/toolkit'
import basketApi from '../../shared/api/basket'
import { GoodsProps } from '../../shared/api/types'

// товары в избранном
export const fetchBasketThunk = createAsyncThunk(
  'basket/fetchBasket',
  async () => {
    const response = await basketApi.fetchBasket()
    return response
  },
)

// добавляем товар в избранное
export const addToBasketAsync = createAsyncThunk(
  'basket/addToBasket',
  async (item: GoodsProps) => {
    await basketApi.addToBasket(item)
    return item
  },
)

//удаленяем товар из избранного
export const removeFromBasketAsync = createAsyncThunk(
  'basket/removeFromBasket',
  async (item: GoodsProps) => {
    await basketApi.removeFromBasket(item)
    return item._id
  },
)
