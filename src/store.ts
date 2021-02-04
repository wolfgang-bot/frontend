import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"

import guildsReducer from "./features/guilds/guildsSlice"
import authReducer from "./features/auth/authSlice"
import moduleReducer from "./features/modules/modulesSlice"
import moduleInstancesReducer from "./features/moduleInstances/moduleInstancesSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    guilds: guildsReducer,
    modules: moduleReducer,
    moduleInstances: moduleInstancesReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store 

export type RootState = ReturnType<typeof rootReducer>