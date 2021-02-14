import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { API } from "../../config/types"
import { fetchGuilds } from "../guilds/guildsSlice"

type GuildState = Record<API.EVENT_STREAM, API.Stream<any>>
type SliceState = Record<string, GuildState>

function createStreamState<T>(type: API.EVENT_STREAM): API.Stream<T> {
    return {
        type,
        status: "idle",
        data: []
    }
}

function createInitialGuildState(): GuildState {
    return {
        "module-instances": createStreamState<API.ModuleInstance>("module-instances"),
        "members": createStreamState<API.Event<API.MemberEventMeta>>("members"),
        "messages": createStreamState<API.Event>("messages"),
        "voice": createStreamState<API.Event<API.VoiceEventMeta>>("voice"),
    }
}

const initialState: SliceState = {}

const streamsSlice = createSlice({
    name: "streams",
    initialState,
    reducers: {
        subscribe: (state, action: PayloadAction<API.StreamArgs>) => {
            if (!state[action.payload.guildId]) {
                state[action.payload.guildId] = createInitialGuildState()
            }

            state[action.payload.guildId][action.payload.eventStream] = {
                type: action.payload.eventStream,
                status: "flowing",
                data: []
            }
        },

        unsubscribe: (state, action: PayloadAction<API.StreamArgs>) => {
            delete state[action.payload.guildId][action.payload.eventStream]
        },

        pause: (state, action: PayloadAction<API.StreamArgs>) => {
            const stream = state[action.payload.guildId][action.payload.eventStream]
            if (stream) {
                stream.status = "paused"
            }
        },

        resume: (state, action: PayloadAction<API.StreamArgs>) => {
            const stream = state[action.payload.guildId][action.payload.eventStream]
            if (stream) {
                stream.status = "flowing"
            }
        },

        data: (state, action: PayloadAction<{
            args: API.StreamArgs,
            data: any
        }>) => {
            const stream = state[action.payload.args.guildId][action.payload.args.eventStream]
            if (stream) {
                stream.data.push(...action.payload.data)
            }
        }
    },
    extraReducers: {
        [fetchGuilds.fulfilled.toString()]: (state, action: PayloadAction<API.Guild[]>) => {
            action.payload.forEach(guild => {
                if (!state[guild.id]) {
                    state[guild.id] = createInitialGuildState()
                }
            })
        }
    }
})

export const { subscribe, unsubscribe, pause, resume, data } = streamsSlice.actions

export default streamsSlice.reducer