import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { API } from "../../config/types"

const initialState: Record<string, Partial<Record<API.EVENT_STREAM, API.Stream<any>>>> = {}

const streamsSlice = createSlice({
    name: "streams",
    initialState,
    reducers: {
        subscribe: (state, action: PayloadAction<{
            stream: API.EVENT_STREAM,
            guildId: string
        }>) => {
            if (!state[action.payload.guildId]) {
                state[action.payload.guildId] = {}
            }

            state[action.payload.guildId][action.payload.stream] = {
                type: action.payload.stream,
                status: "flowing",
                data: []
            }
        },

        unsubscribe: (state, action: PayloadAction<{
            stream: API.EVENT_STREAM,
            guildId: string
        }>) => {
            delete state[action.payload.guildId][action.payload.stream]
        },

        pause: (state, action: PayloadAction<{
            stream: API.EVENT_STREAM,
            guildId: string
        }>) => {
            const stream = state[action.payload.guildId][action.payload.stream]
            if (stream) {
                stream.status = "paused"
            }
        },

        resume: (state, action: PayloadAction<{
            stream: API.EVENT_STREAM,
            guildId: string
        }>) => {
            const stream = state[action.payload.guildId][action.payload.stream]
            if (stream) {
                stream.status = "flowing"
            }
        }
    }
})

export const { subscribe, unsubscribe, pause, resume } = streamsSlice.actions

export default streamsSlice.reducer