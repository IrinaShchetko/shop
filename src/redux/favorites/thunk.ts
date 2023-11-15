import { createAsyncThunk } from '@reduxjs/toolkit'
import favoritesApi from '../../shared/api/favorites'
import { GoodsProps } from '../../shared/api/types'

export const fetchFavoritesThunk = createAsyncThunk(
    'favorites/fetchFavorites',
    async () => {
        const response = await favoritesApi.fetchFavorites()
        return response
    }
)

  // для добавления товара в избранное
  export const addToFavoritesAsync = createAsyncThunk(
    'favorites/addToFavorites',
    async (item: GoodsProps) => {
      await favoritesApi.addToFavorites(item)
      return item
    }
  )
  
  //для удаления товара из избранного
  export const removeFromFavoritesAsync = createAsyncThunk(
    'favorites/removeFromFavorites',
    async (itemId: number) => {
      await favoritesApi.removeFromFavorites(itemId)
      return itemId
    }
  )