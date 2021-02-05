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
    reducers: {
        login: (state, action: PayloadAction<{
            user: API.User,
            token: string
        }>) => {
            state.data.user = action.payload.user
        },
        logout: (state) => {
            state.data.user = undefined
        },
        init: (state, action: PayloadAction<{
            token?: string | null
        }>) => {
            state.status = "pending"
        }
    },
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

export const { login, logout, init } = authSlice.actions

export default authSlice.reducer
