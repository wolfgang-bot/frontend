import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./rootReducer"
import { authMiddleware } from "./middleware"
import api from "../api"

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: { api }
        }
    })
        .concat(authMiddleware)
})

export default store 

export type RootState = ReturnType<typeof rootReducer>

export type ThunkExtraArgument = {
    api: typeof api
}