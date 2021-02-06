import { createSlice, createAsyncThunk, PayloadAction, ThunkAction } from "@reduxjs/toolkit"

import { API, LoadingState, ReduxAPIState } from "../../config/types"
import api from "../../api"
import { fetchGuilds } from "../guilds/guildsSlice"

type GuildState = ReduxAPIState<Record<string, API.ModuleInstance>>

type ModuleInstancesState = {
    guilds: Record<string, GuildState>
}

const initialGuildState: GuildState = {
    data: {},
    status: "idle"
}

const initialState: ModuleInstancesState = {
    guilds: {}
}

export const fetchModuleInstancesForGuild = createAsyncThunk(
    "moduleInstances/fetchModuleInstancesForGuild",
    async (guildId: string) => {
        const res = await api.ws.getModuleInstances(guildId)
        return res.data
    }
)

const moduleInstancesSlice = createSlice({
    name: "moduleInstances",
    initialState,
    reducers: {
        "modules/moduleInstances": (state, action) => {
            state.guilds[action.payload.guildId].status = action.payload.status
        }
    },
    extraReducers: {
        [fetchModuleInstancesForGuild.pending.toString()]: (state, action) => {
            const guild = state.guilds[action.meta.arg]
            if (guild) {
                guild.status = "pending"
            }
        },
        [fetchModuleInstancesForGuild.fulfilled.toString()]: (state, action) => {
            const guild = state.guilds[action.meta.arg]
            if (guild) {
                action.payload.forEach((instance: API.ModuleInstance) => {
                    guild.data[instance.moduleName] = instance
                })
                guild.status = "success"        
            }
        },
        [fetchModuleInstancesForGuild.rejected.toString()]: (state, action) => {
            const guild = state.guilds[action.meta.arg]
            if (guild) {
                guild.status = "error"
                guild.error = action.payload
            }
        },
        [fetchGuilds.fulfilled.toString()]: (state, action: PayloadAction<API.Guild[]>) => {
            action.payload.forEach(guild => {
                if (!state.guilds[guild.id]) {
                    state.guilds[guild.id] = { ...initialGuildState }
                }
            })
        }
    }
})

export default moduleInstancesSlice.reducer