import { Middleware } from "redux"
import { PayloadAction } from "@reduxjs/toolkit"

import store from "./index"
import { API } from "../config/types"
import { API_TOKEN_STORAGE_KEY } from "../config/constants"
import { fetchUser, init } from "../features/auth/authSlice"
import { updateInstances } from "../features/moduleInstances/moduleInstancesSlice"
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

export const streamControlMiddleware: Middleware = () => next => (action: PayloadAction<API.StreamArgs>) => {
    switch (action.type) {
        case "streams/subscribe":
            api.ws.subscribeToStream(action.payload.eventStream, action.payload.guildId)
            break

        case "streams/unsubscribe":
            api.ws.unsubscribeFromStream(action.payload.eventStream, action.payload.guildId)
            break

        case "streams/pause":
            api.ws.pauseStream(action.payload.eventStream, action.payload.guildId)
            break
        
        case "streams/resume":
            api.ws.resumeStream(action.payload.eventStream, action.payload.guildId)
            break
    }

    next(action)
}

export const streamDataMiddleware: Middleware = () => next => (action: PayloadAction<{
    args: API.StreamArgs,
    data: any
}>) => {
    if (action.type === "streams/data") {
        switch (action.payload.args.eventStream) {
            case "module-instances":
                store.dispatch(updateInstances({
                    guildId: action.payload.args.guildId,
                    data: action.payload.data
                }))
                return
        }
    }

    next(action)
}