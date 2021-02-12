import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { ReduxAPIState, API } from "../../config/types"
import { ThunkExtraArgument } from "../../store"

const initialState: ReduxAPIState<API.Locale[]> = {
    data: [],
    status: "idle"
}

export const fetchLocales = createAsyncThunk<
    API.Locale[] | undefined,
    void,
    { extra: ThunkExtraArgument }
>("locales/fetchLocales", async (_, { extra: { api } }) => {
    const res = await api.ws.getLocales()
    return res.data
})

const localeSlice = createSlice({
    name: "locales",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchLocales.pending.toString()]: (state) => {
            state.status = "pending"
        },
        [fetchLocales.fulfilled.toString()]: (state, action: PayloadAction<API.Locale[]>) => {
            state.status = "success"
            state.data = action.payload
        },
        [fetchLocales.rejected.toString()]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        }
    }
})

export default localeSlice.reducer