import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { API, ReduxAPIState } from "../../config/types"
import { ThunkExtraArgument } from "../../store"

const initialState: ReduxAPIState<{
    user?: API.User,
    token?: string
}> = {
    data: {},
    status: "idle"
}

export const fetchUser = createAsyncThunk<
    API.User | undefined,
    void,
    { extra: ThunkExtraArgument }
>("auth/fetchUser", async (_, { extra: { api } }) => {
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
            state.data.token = action.payload.token
        },
        logout: (state) => {
            state.data = {}
            state.status = "idle"
        },
        initAPI: (state, action: PayloadAction<{
            token: string
        }>) => {
            state.status = "pending"
            state.data.token = action.payload.token
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

export const { login, logout, initAPI } = authSlice.actions

export default authSlice.reducer
