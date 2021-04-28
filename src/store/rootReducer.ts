import { combineReducers } from "redux"

import guildsReducer from "../features/guilds/guildsSlice"
import authReducer from "../features/auth/authSlice"
import moduleReducer from "../features/modules/modulesSlice"
import moduleInstancesReducer from "../features/moduleInstances/moduleInstancesSlice"
import streamsReducer from "../features/streams/streamsSlice"
import settingsReducer from "../features/settings/settingsSlice"
import usersReducer from "../features/users/usersSlice"

export default combineReducers({
    auth: authReducer,
    guilds: guildsReducer,
    modules: moduleReducer,
    moduleInstances: moduleInstancesReducer,
    streams: streamsReducer,
    settings: settingsReducer,
    users: usersReducer
})
