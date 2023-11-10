import { createSlice } from '@reduxjs/toolkit'
import { CatalogProps } from '../../shared/api/types'
import { fetchCatalogThunk } from './thunk'

interface CatalogAllProps {
    isLoading: boolean,
    catalog: CatalogProps[],
    error: unknown
}
const initialState: CatalogAllProps = {
    isLoading: false,
    catalog: [],
    error: ''
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(fetchCatalogThunk.pending.match, (state) => {
            state.isLoading = true
        })
        builder.addMatcher(fetchCatalogThunk.fulfilled.match, (state, action) => {
            state.isLoading = false
            state.catalog = action.payload
        })
        builder.addMatcher(fetchCatalogThunk.rejected.match, (state, action) => {
            state.isLoading = true
            state.error = action.payload
        })
    }
})