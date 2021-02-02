import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "../../config/api.js"

const initialState = {
    data: {},
    status: "idle",
    error: null
}

export const fetchModules = createAsyncThunk("module/fetchModules", async () => {
    const res = await api.ws.getModules()
    return res.data
})

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    extraReducers: {
        [fetchModules.pending]: (state, action) => {
            state.status = "pending"
        },
        [fetchModules.fulfilled]: (state, action) => {
            state.status = "succeeded"
            action.payload.forEach(module => {
                state.data[module.name] = module
            })
        },
        [fetchModules.rejected]: (state, action) => {
            state.status = "error"
        }
    }
})

export default modulesSlice.reducer