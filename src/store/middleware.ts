import { Middleware } from "redux"
import { PayloadAction } from "@reduxjs/toolkit"

import store from "./index"
import { API_TOKEN_STORAGE_KEY } from "../config/constants"
import { fetchUser, init } from "../features/auth/authSlice"
import api from "../api"

export const authMiddleware: Middleware = () => next => (action: PayloadAction<{
    token?: string
}>) => {
    switch (action.type) {
        case "auth/login":
            if (action.payload.token) {
                localStorage.setItem(API_TOKEN_STORAGE_KEY, action.payload.token)
                store.dispatch(init({ token: action.payload.token }))
            }
            break

        case "auth/logout":
            localStorage.removeItem(API_TOKEN_STORAGE_KEY)
            break

        case "auth/init":
            if (!action.payload.token) {
                return
            }

            api.init(action.payload.token)
                .then(() => store.dispatch(fetchUser()))

            break
    }

    next(action)
}