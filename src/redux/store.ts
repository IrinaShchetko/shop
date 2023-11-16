import { configureStore } from "@reduxjs/toolkit";
import { basketReducer, catalogReducer, favoritesReducer, goodsReducer } from "."
import { combineReducers } from "redux"

export const reducers = combineReducers({
    catalog: catalogReducer,
    goods: goodsReducer,
    favorites: favoritesReducer,
    basket: basketReducer,
})
export const store = configureStore({
    reducer: reducers,
    devTools: true
})

export type RootStore = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch