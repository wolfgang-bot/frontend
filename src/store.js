import { configureStore } from "@reduxjs/toolkit"

import guildsReducer from "./features/guilds/guildsSlice.js"
import authReducer from "./features/auth/authSlice.js"

export default configureStore({
    reducer: {
        guilds: guildsReducer,
        auth: authReducer
    }
})