import { createAsyncThunk } from '@reduxjs/toolkit'
import catalogApi from '../../shared/api/catalog'

export const fetchCatalogThunk = createAsyncThunk(
  'catalog/fetchCatalog',
  async () => {
    const response = await catalogApi.fetchCatalog()
    return response
  },
)
