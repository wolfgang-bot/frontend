import { configureStore } from "@reduxjs/toolkit"

import guildsReducer from "./features/guilds/guildsSlice.js"
import authReducer from "./features/auth/authSlice.js"
import moduleReducer from "./features/modules/modulesSlice.js"
import moduleInstancesReducer from "./features/moduleInstances/moduleInstancesSlice.js"

export default configureStore({
    reducer: {
        auth: authReducer,
        guilds: guildsReducer,
        modules: moduleReducer,
        moduleInstances: moduleInstancesReducer
    }
})