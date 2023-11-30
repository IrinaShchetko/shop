import { createAsyncThunk } from '@reduxjs/toolkit'
import goodsApi from '../../shared/api/goods'

export const fetchGoodsThunk = createAsyncThunk('goods/fetchGoods', async (category: string) => {
  const response = await goodsApi.fetchGoods(category)
  return response
})
