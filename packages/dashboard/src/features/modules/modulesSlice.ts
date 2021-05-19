import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { API, ReduxAPIState } from "../../config/types"
import { ThunkExtraArgument } from "../../store"
import { updateUserGuilds } from "../guilds/guildsSlice"

type ModulesMap = Record<string, API.Module>
type GuildState = ReduxAPIState<ModulesMap>
type ModuleState = {
    guilds: Record<string, GuildState>
}

const initialState: ModuleState = {
    guilds: {}
}

function makeInitialGuildState(): GuildState {
    return {
        data: {},
        status: "idle"
    }
}

export const fetchModules = createAsyncThunk<
    API.Module[] | undefined,
    { guildId: string },
    { extra: ThunkExtraArgument }
>(
    "module/fetchModules",
    async (args, { extra: { api } }) => {
        const res = await api.ws.getModules(args)
        return res?.data
    }
)

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        updateModules: (state, action: PayloadAction<{
            guildId: string,
            data: API.Module[]
        }>) => {
            const guild = state.guilds[action.payload.guildId]
            if (!guild) {
                return
            }
            guild.status = "success"
            action.payload.data.forEach(module => {
                guild.data[module.key] = module
            })
        }
    },
    extraReducers: {
        [updateUserGuilds.toString()]: (state, action: PayloadAction<API.Guild[]>) => {
            action.payload.forEach(guild => {
                if (!state.guilds[guild.id]) {
                    state.guilds[guild.id] = makeInitialGuildState()
                }
            })
        },
        [fetchModules.pending.toString()]: (state, action) => {
            const guild = state.guilds[action.meta.arg.guildId]
            if (!guild) {
                return
            }
            guild.status = "pending"
        },
        [fetchModules.fulfilled.toString()]: (state, action) => {
            const guild = state.guilds[action.meta.arg.guildId]
            if (!guild) {
                return
            }
            guild.status = "success"
            action.payload.forEach((module: API.Module) => {
                guild.data[module.key] = module

                module.commands.forEach(command => {
                    if (!module.commandGroups) {
                        module.commandGroups = {}
                    }

                    if (!module.commandGroups[command.group]) {
                        module.commandGroups[command.group] = {}
                    }

                    module.commandGroups[command.group][command.name] = command
                })
            })
        },
        [fetchModules.rejected.toString()]: (state, action) => {
            const guild = state.guilds[action.meta.arg.guildId]
            if (!guild) {
                return
            }
            guild.status = "error"
            guild.error = action.payload
        }
    }
})

export const { updateModules } = modulesSlice.actions
export default modulesSlice.reducer
