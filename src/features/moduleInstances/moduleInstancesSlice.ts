import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { API, LoadingState, ReduxAPIState } from "../../config/types"
import api from "../../api"
import { fetchGuilds } from "../guilds/guildsSlice"

type GuildState = ReduxAPIState<{
    moduleInstances: Record<string, API.ModuleInstance>
}>

type ModuleInstancesState = {
    guilds: Record<string, GuildState>
}

const initialGuildState: GuildState = {
    data: {
        moduleInstances: {}
    },
    status: "idle"
}

const initialState: ModuleInstancesState = {
    guilds: {}
}

const updateGuildStatus = (guildId: string, status: LoadingState) => ({
    type: "moduleInstances/updateGuildStatus",
    payload: {
        guildId,
        status
    }
})

export const fetchModuleInstancesForGuild = createAsyncThunk(
    "moduleInstances/fetchModuleInstancesForGuild",
    async (guildId: string, { dispatch }) => {
        dispatch(updateGuildStatus(guildId, "pending"))
        const res = await api.ws.getModuleInstances(guildId)
        dispatch(updateGuildStatus(guildId, "success"))
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
        [fetchModuleInstancesForGuild.fulfilled.toString()]: (state, action: PayloadAction<API.ModuleInstance[]>) => {
            action.payload.forEach(instance => {
                console.log(instance)
            })
        },
        [fetchModuleInstancesForGuild.rejected.toString()]: (state, action) => {
            console.log(action)
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