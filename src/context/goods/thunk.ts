import { createAsyncThunk } from '@reduxjs/toolkit'
import goodsApi from '../../shared/api/goods'

export const fetchGoodsThunk = createAsyncThunk(
    'goods/fetchGoods',
    async () => {
        const response = await goodsApi.fetchGoods()
        return response
    }
)