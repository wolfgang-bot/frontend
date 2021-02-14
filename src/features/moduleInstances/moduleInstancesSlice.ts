import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { API, INSTANCE_STATES, ReduxAPIState } from "../../config/types"
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
        [fetchGuilds.fulfilled.toString()]: (state, action: PayloadAction<API.Guild[]>) => {
            action.payload.forEach(guild => {
                if (!state.guilds[guild.id]) {
                    state.guilds[guild.id] = makeInitialGuildState()
                }
            })
        }
    }
})

export const { updateInstances } = moduleInstancesSlice.actions

export default moduleInstancesSlice.reducer