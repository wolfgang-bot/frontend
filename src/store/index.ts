import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./rootReducer"
import { authMiddleware } from "./middleware"

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authMiddleware)
})

export default store 

export type RootState = ReturnType<typeof rootReducer>