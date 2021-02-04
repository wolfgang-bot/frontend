import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import api from "../../api"
import { fetchGuilds } from "../guilds/guildsSlice.js"

const initialGuildState = {
    moduleInstances: {},
    status: "idle",
    error: null
}

const initialState = {
    guilds: {}
}

const updateGuildStatus = (guildId, status) => ({
    type: "moduleInstances/updateGuildStatus",
    payload: {
        guildId,
        status
    }
})

export const fetchModuleInstancesForGuild = createAsyncThunk("moduleInstances/fetchModuleInstancesForGuild", async (guildId, { dispatch }) => {
    dispatch(updateGuildStatus(guildId, "pending"))
    const res = await api.ws.getModuleInstances(guildId)
    dispatch(updateGuildStatus(guildId, "succeeded"))
    return res.data
})

const moduleInstancesSlice = createSlice({
    name: "moduleInstances",
    initialState,
    reducers: {
        "modules/moduleInstances": (state, action) => {
            state.guilds[action.payload.guildId].status = action.payload.status
        }
    },
    extraReducers: {
        [fetchModuleInstancesForGuild.fulfilled]: (state, action) => {
            action.payload.forEach(instance => {
                console.log(instance)
            })
        },
        [fetchModuleInstancesForGuild.rejected]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        },
        [fetchGuilds.fulfilled]: (state, action) => {
            action.payload.forEach(guild => {
                state.guilds[guild.id] = { ...initialGuildState }
            })
        }
    }
})

export default moduleInstancesSlice.reducer