import { configureStore } from "@reduxjs/toolkit";
import { catalogReducer, favoritesReducer, goodsReducer } from "."
import { combineReducers } from "redux"

export const reducers = combineReducers({
    catalog: catalogReducer,
    goods: goodsReducer,
    favorites: favoritesReducer,
    // color: colorReducer
})
export const store = configureStore({
    reducer: reducers,
    devTools: true
})

export type RootStore = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch