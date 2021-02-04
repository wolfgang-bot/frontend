import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import api from "../../api"

const initialState = {
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
    extraReducers: {
        [fetchUser.pending]: (state, action) => {
            state.status = "pending"
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.status = "succeeded"
            state.user = action.payload
            state.isLoggedIn = true
        },
        [fetchUser.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        }
    }
})

export default authSlice.reducer