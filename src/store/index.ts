import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./rootReducer"
import {
    authMiddleware,
    streamControlMiddleware,
    streamDataMiddleware
} from "./middleware"
import api from "../api"

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: { api }
        },
        serializableCheck: false,
        immutableCheck: false

    })
        .concat(authMiddleware)
        .concat(streamControlMiddleware)
        .concat(streamDataMiddleware)
})

export default store 

export type RootState = ReturnType<typeof rootReducer>

export type ThunkExtraArgument = {
    api: typeof api
}