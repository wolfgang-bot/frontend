import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import api from "../../config/api"

const initialState = {
    data: [],
    status: "idle",
    error: null
}

export const fetchGuilds = createAsyncThunk("guilds/fetchGuilds", () => api.getGuilds())

const guildsSlice = createSlice({
    name: "guild",
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [fetchGuilds.pending]: (state, action) => {
            state.status = "pending"
        },
        [fetchGuilds.fulfilled]: (state, action) => {
            state.status = "succeeded"
            state.data = action.payload
        },
        [fetchGuilds.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        }
    }
})

export default guildsSlice.reducer