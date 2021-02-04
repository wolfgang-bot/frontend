import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import api from "../../api"

const initialState = {
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
    extraReducers: {
        [fetchGuilds.pending]: (state, action) => {
            state.status = "pending"
        },
        [fetchGuilds.fulfilled]: (state, action) => {
            state.status = "succeeded"
            action.payload.forEach(guild => {
                state.data[guild.id] = guild
            })
        },
        [fetchGuilds.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        }
    }
})

export default guildsSlice.reducer