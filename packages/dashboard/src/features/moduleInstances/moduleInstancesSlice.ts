import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { API, INSTANCE_STATES, ReduxAPIState } from "../../config/types"
import { RootState, ThunkExtraArgument } from "../../store"
import { updateUserGuilds } from "../guilds/guildsSlice"

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
    { instanceId: string, guildId: string, value: object },
    { extra: ThunkExtraArgument }
>(
    "moduleInstances/updateConfig",
    async ({ instanceId, value }, { extra: { api }}) => {
        const res = await api.ws.updateModuleInstanceConfig({
            instanceId,
            newConfig: value
        })
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
                guild.data[instance.id] = instance

                if (instance.state === INSTANCE_STATES.INACTIVE) {
                    delete guild.data[instance.id]
                }
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

        [updateConfig.fulfilled.toString()]: (state, action: any) => {
            const guild = state.guilds[action.meta.arg.guildId]
            const instance = guild.data[action.meta.arg.instanceId]
            instance.config = action.payload
        }
    }
})

export function selectInstanceByModuleKey(guildId: string, moduleKey: string) {
    return (store: RootState) => {
        const instances = store.moduleInstances.guilds[guildId].data
        return Object.values(instances).find((instance) => instance.moduleKey === moduleKey)
    }
}

export const { updateInstances } = moduleInstancesSlice.actions

export default moduleInstancesSlice.reducer
