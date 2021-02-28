import { combineReducers } from "redux"

import guildsReducer from "../features/guilds/guildsSlice"
import authReducer from "../features/auth/authSlice"
import moduleReducer from "../features/modules/modulesSlice"
import moduleInstancesReducer from "../features/moduleInstances/moduleInstancesSlice"
import streamsSlice from "../features/streams/streamsSlice"
import commandsSlice from "../features/commands/commandsSlice"
import settingsSlice from "../features/settings/settingsSlice"

export default combineReducers({
    auth: authReducer,
    guilds: guildsReducer,
    modules: moduleReducer,
    moduleInstances: moduleInstancesReducer,
    streams: streamsSlice,
    commands: commandsSlice,
    settings: settingsSlice
})
