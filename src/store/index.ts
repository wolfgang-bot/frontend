import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./rootReducer"
import rootMiddleware from "./rootMiddleware"
import getPersistantState from "./preload"
import api from "../api"

const store = configureStore({
    reducer: rootReducer,
    middleware: rootMiddleware,
    preloadedState: getPersistantState()
})

export default store 

export type RootState = ReturnType<typeof rootReducer>

export type ThunkExtraArgument = {
    api: typeof api
}