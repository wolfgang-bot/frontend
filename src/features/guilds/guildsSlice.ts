import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { API, ReduxAPIState } from "../../config/types"
import api from "../../api"

const initialState: ReduxAPIState<Record<string, API.Guild>> = {
    data: {},
    status: "idle"
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
        [fetchGuilds.fulfilled.toString()]: (state, action: PayloadAction<API.Guild[]>) => {
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