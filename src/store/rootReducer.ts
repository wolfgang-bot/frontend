import { combineReducers } from "redux"

import guildsReducer from "../features/guilds/guildsSlice"
import authReducer from "../features/auth/authSlice"
import moduleReducer from "../features/modules/modulesSlice"
import moduleInstancesReducer from "../features/moduleInstances/moduleInstancesSlice"
import localesReducer from "../features/locales/localeSlice"

export default combineReducers({
    auth: authReducer,
    guilds: guildsReducer,
    modules: moduleReducer,
    moduleInstances: moduleInstancesReducer,
    locales: localesReducer
})
