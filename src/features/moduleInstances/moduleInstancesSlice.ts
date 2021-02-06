import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { API, ReduxAPIState } from "../../config/types"
import { fetchGuilds } from "../guilds/guildsSlice"
import { ThunkExtraArgument } from "../../store"

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

export const fetchModuleInstancesForGuild = createAsyncThunk<
    API.ModuleInstance[] | undefined,
    string,
    { extra: ThunkExtraArgument }
>(
    "moduleInstances/fetchModuleInstancesForGuild",
    async (guildId, { extra: { api } }) => {
        const res = await api.ws.getModuleInstances(guildId)
        return res.data
    }
)

const moduleInstancesSlice = createSlice({
    name: "moduleInstances",
    initialState,
    reducers: {
        updateInstances: (state, action: PayloadAction<API.ModuleInstance[]>) => {
            action.payload.forEach(instance => {
                const guild = state.guilds[instance.guildId]
                if (guild) {
                    guild.data[instance.moduleName] = instance
                }
            })
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

export const { updateInstances } = moduleInstancesSlice.actions

export default moduleInstancesSlice.reducer