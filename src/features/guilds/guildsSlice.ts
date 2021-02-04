import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { API, LoadingState } from "../../config/types"
import api from "../../api"

type GuildsState = {
    data: Record<string, API.Guild>,
    status: LoadingState,
    error?: any
}

const initialState: GuildsState = {
    data: {},
    status: "idle",
    error: null
}

export const fetchGuilds = createAsyncThunk("guilds/fetchGuilds", async () => {
    const res = await api.ws.getGuilds()
    return res.data
})

const guildsSlice = createSlice({
    name: "guild",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchGuilds.pending.toString()]: (state) => {
            state.status = "pending"
        },
        [fetchGuilds.fulfilled.toString()]: (state, action) => {
            state.status = "success"
            action.payload.forEach(guild => {
                state.data[guild.id] = guild
            })
        },
        [fetchGuilds.rejected.toString()]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        }
    }
})

export default guildsSlice.reducer