import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { API, ReduxAPIState } from "../../config/types"
import api from "../../api"

type ModuleState = ReduxAPIState<Record<string, API.Module>>

const initialState: ModuleState = {
    data: {},
    status: "idle"
}

export const fetchModules = createAsyncThunk("module/fetchModules", async () => {
    const res = await api.ws.getModules()
    return res.data
})

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchModules.pending.toString()]: (state) => {
            state.status = "pending"
        },
        [fetchModules.fulfilled.toString()]: (state, action: PayloadAction<API.Module[]>) => {
            state.status = "success"
            action.payload.forEach(module => {
                state.data[module.name] = module
            })
        },
        [fetchModules.rejected.toString()]: (state) => {
            state.status = "error"
        }
    }
})

export default modulesSlice.reducer