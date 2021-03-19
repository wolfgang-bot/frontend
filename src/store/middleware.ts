import { Middleware } from "redux"
import { PayloadAction } from "@reduxjs/toolkit"

import store from "./index"
import { API } from "../config/types"
import { API_TOKEN_STORAGE_KEY, LOCAL_STORAGE_REDUX_SETTINGS_KEY } from "../config/constants"
import { fetchUser, initAPI, logout } from "../features/auth/authSlice"
import { updateInstances } from "../features/moduleInstances/moduleInstancesSlice"
import { makeStreamStatusSelector } from "../features/streams/streamsSlice"
import api from "../api"
import { updateGuilds } from "../features/guilds/guildsSlice"

export const authMiddleware: Middleware = () => next => (action: PayloadAction<{
    token?: string
}>) => {
    switch (action.type) {
        case "auth/login":
            if (action.payload.token) {
                localStorage.setItem(API_TOKEN_STORAGE_KEY, action.payload.token)
                store.dispatch(initAPI({ token: action.payload.token }))
            }
            break

        case "auth/logout":
            localStorage.removeItem(API_TOKEN_STORAGE_KEY)
            break

        case "auth/initAPI":
            if (!action.payload.token) {
                return
            }

            api.login(action.payload.token)
                .then(() => store.dispatch(fetchUser()))
                .catch(() => store.dispatch(logout()))

            break
    }

    next(action)
}

function getStreamStatus(args: API.StreamArgs) {
    return makeStreamStatusSelector(args)(store.getState())
}

export const streamControlMiddleware: Middleware = () => next => (action: PayloadAction<API.StreamArgs>) => {
    switch (action.type) {
        case "streams/subscribe":
            if (getStreamStatus(action.payload) === "idle") {
                api.ws.subscribeToStream(action.payload)
            }
            break

        case "streams/unsubscribe":
            if (getStreamStatus(action.payload)) {
                api.ws.unsubscribeFromStream(action.payload)
            }
            break

        case "streams/pause":
            if (getStreamStatus(action.payload) === "flowing") {
                api.ws.pauseStream(action.payload)
            }
            break
        
        case "streams/resume":
            if (getStreamStatus(action.payload) === "paused") {
                api.ws.resumeStream(action.payload)
            }
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
            case "guild-module-instances":
                store.dispatch(updateInstances({
                    guildId: action.payload.args.guildId!,
                    data: action.payload.data
                }))
                break

            case "user-guilds":
                store.dispatch(updateGuilds(action.payload.data))
                break
        }
    }

    next(action)
}

export const settingsMiddleware: Middleware = () => next => (action: PayloadAction<any>) => {
    if (action.type === "settings/set") {
        localStorage.setItem(LOCAL_STORAGE_REDUX_SETTINGS_KEY, JSON.stringify(action.payload))
    }

    next(action)
}
