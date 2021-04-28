import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { API, ReduxAPIState } from "../../config/types"
import { ThunkExtraArgument } from "../../store"

type SliceState = {
    admins: ReduxAPIState<Record<string, API.Admin>>
}

const initialState: SliceState = {
    admins: {
        data: {},
        status: "idle"
    }
}

export const fetchAdmins = createAsyncThunk<
    API.Admin[] | undefined,
    void,
    { extra: ThunkExtraArgument }
>("users/fetchAdmins", async (_, { extra: { api } }) => {
    const res = await api.ws.getAdmins()
    return res.data
})

export const createAdmin = createAsyncThunk<
    API.Admin | undefined,
    { userId: string },
    { extra: ThunkExtraArgument }
>("users/createAdmin", async (args, { extra: { api } }) => {
    const res = await api.ws.createAdmin(args)
    return res.data
})

export const removeAdmin = createAsyncThunk<
    API.Admin | undefined,
    API.Admin,
    { extra: ThunkExtraArgument }
>("users/removeAdmin", async (admin, { extra: { api } }) => {
    const res = await api.ws.removeAdmin({ id: admin.id })
    return res.data
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAdmins.pending.toString()]: (state) => {
            state.admins.status = "pending"
        },
        [fetchAdmins.fulfilled.toString()]: (state, action: PayloadAction<API.Admin[]>) => {
            state.admins.status = "success"
            action.payload.forEach(admin => {
                state.admins.data[admin.id] = admin
            })
        },
        [fetchAdmins.rejected.toString()]: (state, action: PayloadAction<string>) => {
            state.admins.status = "error"
            state.admins.error = action.payload
        },
        [createAdmin.fulfilled.toString()]: (state, action: PayloadAction<API.Admin>) => {
            state.admins.data[action.payload.id] = action.payload
        },
        [removeAdmin.fulfilled.toString()]: (state, action: PayloadAction<API.Admin>) => {
            delete state.admins.data[action.payload.id]
        },
    }
})

export default usersSlice.reducer
