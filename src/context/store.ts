import { configureStore } from "@reduxjs/toolkit";
import { catalogReducer } from "."
import { combineReducers } from "redux"

export const reducers = combineReducers({
    catalog: catalogReducer
})
export const store = configureStore({
    reducer: reducers,
    devTools: true
})

export type RootStore = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch