import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { API, INSTANCE_STATES, ReduxAPIState } from "../../config/types"
import { ThunkExtraArgument } from "../../store"
import { fetchGuilds } from "../guilds/guildsSlice"

type GuildState = ReduxAPIState<Record<string, API.ModuleInstance>>

type ModuleInstancesState = {
    guilds: Record<string, GuildState>
}

function makeInitialGuildState(): GuildState {
    return {
        data: {},
        status: "idle"
    }
}

const initialState: ModuleInstancesState = {
    guilds: {}
}

export const updateConfig = createAsyncThunk<
    object | undefined,
    { guildId: string, moduleKey: string, value: object },
    { extra: ThunkExtraArgument }
>(
    "moduleInstances/updateConfig",
    async ({ guildId, moduleKey, value }, { extra: { api }}) => {
        const res = await api.ws.updateModuleInstanceConfig(guildId, moduleKey, value)
        return res.data
    }
)

const moduleInstancesSlice = createSlice({
    name: "moduleInstances",
    initialState,
    reducers: {
        updateInstances: (state, action: PayloadAction<{
            guildId: string,
            data: API.ModuleInstance[]
        }>) => {
            if (!state.guilds[action.payload.guildId]) {
                state.guilds[action.payload.guildId] = makeInitialGuildState()
            }

            const guild = state.guilds[action.payload.guildId]
            guild.status = "success"
            
            action.payload.data.forEach(instance => {
                guild.data[instance.moduleKey] = instance

                if (instance.state === INSTANCE_STATES.INACTIVE) {
                    delete guild.data[instance.moduleKey]
                }
            })
        }
    },
    extraReducers: {
        /**
         * Thunk: moduleInstances/fetchGuilds 
         */
        [fetchGuilds.fulfilled.toString()]: (state, action: PayloadAction<API.Guild[]>) => {
            action.payload.forEach(guild => {
                if (!state.guilds[guild.id]) {
                    state.guilds[guild.id] = makeInitialGuildState()
                }
            })
        },

        /**
         * Thunk: moduleInstances/updateConfig
         */
        [updateConfig.fulfilled.toString()]: (state, action: any) => {
            const guild = state.guilds[action.meta.arg.guildId]
            const instance = guild.data[action.meta.arg.moduleKey]
            instance.config = action.payload
        }
    }
})

export const { updateInstances } = moduleInstancesSlice.actions

export default moduleInstancesSlice.reducer
