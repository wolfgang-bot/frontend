import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { API, ReduxAPIState } from "../../config/types"
import { ThunkExtraArgument } from "../../store"

type ModuleState = ReduxAPIState<Record<string, API.Module>>

const initialState: ModuleState = {
    data: {},
    status: "idle"
}

export const fetchModules = createAsyncThunk<
    API.Module[] | undefined,
    void,
    { extra: ThunkExtraArgument }
>("module/fetchModules", async (_, { extra: { api } }) => {
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
                state.data[module.key] = module
            })
        },
        [fetchModules.rejected.toString()]: (state) => {
            state.status = "error"
        }
    }
})

export default modulesSlice.reducer