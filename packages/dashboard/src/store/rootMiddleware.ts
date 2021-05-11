import { getDefaultMiddleware } from "@reduxjs/toolkit"

import type { ThunkExtraArgument } from "./index"
import api from "../api"
import {
    authMiddleware,
    streamControlMiddleware,
    streamDataMiddleware,
    settingsMiddleware
} from "./middleware"

function rootMiddleware() {
    const extraArgument: ThunkExtraArgument = {
        api
    }

    return getDefaultMiddleware({
        thunk: {
            extraArgument
        },
        serializableCheck: false,
        immutableCheck: false

    })
        .concat(authMiddleware)
        .concat(streamControlMiddleware)
        .concat(streamDataMiddleware)
        .concat(settingsMiddleware)
}

export default rootMiddleware