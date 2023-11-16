import { createSlice} from "@reduxjs/toolkit";
import { GoodsProps } from "../../shared/api/types";
import { addToFavoritesAsync, fetchFavoritesThunk, removeFromFavoritesAsync } from ".";

interface FavoritesState {
  items: GoodsProps[];
  status: 'none' | 'loading' | 'succeeded' | 'failed'
}

const initialState: FavoritesState = {
  items: [],
  status:'none'
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(addToFavoritesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items.push(action.payload)
      })
      .addCase(removeFromFavoritesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = state.items.filter((item) => item._id !== action.payload)
      })
      .addCase(fetchFavoritesThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchFavoritesThunk.rejected, (state, action) => {
        state.status = 'failed'
        // state.error = action.error.message ?? 'An error occurred'
      })
  }
})
