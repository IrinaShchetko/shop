import { createSlice } from '@reduxjs/toolkit'
import { GoodsProps } from '../../shared/api/types'
import { fetchGoodsThunk } from './thunk'

interface GoodsAllProps {
    isLoading: boolean,
    goods: GoodsProps[],
    error: unknown
}
const initialState: GoodsAllProps = {
    isLoading: false,
    goods: [],
    error: ''
}

export const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(fetchGoodsThunk.pending.match, (state) => {
            state.isLoading = true
        })
        builder.addMatcher(fetchGoodsThunk.fulfilled.match, (state, action) => {
            state.isLoading = false
            state.goods = action.payload
        })
        builder.addMatcher(fetchGoodsThunk.rejected.match, (state, action) => {
            state.isLoading = true
            state.error = action.payload
        })
    }
})