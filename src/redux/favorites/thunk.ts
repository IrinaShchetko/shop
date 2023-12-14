import { createAsyncThunk } from '@reduxjs/toolkit'
import favoritesApi from '../../shared/api/favorites'
import { GoodsProps } from '../../shared/api/types'

// товары в избранном
export const fetchFavoritesThunk = createAsyncThunk('favorites/fetchFavorites', async () => {
  const response = await favoritesApi.fetchFavorites()
  return response
})

// добавляем товар в избранное
export const addToFavoritesAsync = createAsyncThunk('favorites/addToFavorites', async (item: GoodsProps) => {
  await favoritesApi.addToFavorites(item)
  return item
})

//удаленяем товар из избранного
export const removeFromFavoritesAsync = createAsyncThunk('favorites/removeFromFavorites', async (item: GoodsProps) => {
  await favoritesApi.removeFromFavorites(item)
  return item._id
})
