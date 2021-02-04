import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { API, LoadingState } from "../../config/types"
import api from "../../api"

type AuthState = {
    user: API.User,
    isLoggedIn: boolean,
    status: LoadingState,
    error?: any
}

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    status: "idle",
    error: null
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
        [fetchUser.fulfilled.toString()]: (state, action) => {
            state.status = "success"
            state.user = action.payload
            state.isLoggedIn = true
        },
        [fetchUser.rejected.toString()]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        }
    }
})

export default authSlice.reducer