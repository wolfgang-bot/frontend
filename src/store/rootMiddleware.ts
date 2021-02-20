import { getDefaultMiddleware } from "@reduxjs/toolkit"

import type { ThunkExtraArgument } from "./index"
import api from "../api"
import {
    authMiddleware,
    streamControlMiddleware,
    streamDataMiddleware
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
}

export default rootMiddleware