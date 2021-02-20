import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { API, ReduxAPIState } from "../../config/types"
import { ThunkExtraArgument } from "../../store"

type CommandsMap = Record<string, API.Command>

type CommandGroupsMap = Record<string, CommandsMap>

type ModuleCommandsMap = Record<string, CommandGroupsMap>

const initialState: ReduxAPIState<ModuleCommandsMap> = {
    data: {},
    status: "idle"
}

export const fetchCommands = createAsyncThunk<
    API.Command[] | undefined,
    void,
    { extra: ThunkExtraArgument }
>(
    "commands/fetchCommands",
    async (_, { extra: { api } }) => {
        const res = await api.http.getCommands()
        return res.data
    }
)

const commandsSlice = createSlice({
    name: "commands",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCommands.pending.toString()]: (state) => {
            state.status = "pending"
        },
        [fetchCommands.fulfilled.toString()]: (state, action: PayloadAction<API.Command[]>) => {
            state.status = "success"
            action.payload.forEach(command => {
                if (!state.data[command.module]) {
                    state.data[command.module] = {}
                }
                
                if (!state.data[command.module][command.group]) {
                    state.data[command.module][command.group] = {}
                }

                state.data[command.module][command.group][command.name] = command
            })
        },
        [fetchCommands.rejected.toString()]: (state, action) => {
            state.status = "pending"
            state.error = action.payload
        }
    }
})

export default commandsSlice.reducer