import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { API, ReduxAPIState } from "../../config/types"
import api from "../../api"

const initialState: ReduxAPIState<{
    user?: API.User
}> = {
    data: {},
    status: "idle"
}

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
    const res = await api.http.getProfile()
    return res.data
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUser.pending.toString()]: (state) => {
            state.status = "pending"
        },
        [fetchUser.fulfilled.toString()]: (state, action: PayloadAction<API.User>) => {
            state.status = "success"
            state.data.user = action.payload
        },
        [fetchUser.rejected.toString()]: (state, action: PayloadAction<string>) => {
            state.status = "error"
            state.error = action.payload
        }
    }
})

export default authSlice.reducer