import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { API } from "../../config/types"
import { RootState } from "../../store"
import { fetchGuilds } from "../guilds/guildsSlice"

type StreamsMap = Partial<Record<API.EVENT_STREAM, API.Stream<any>>>
type SliceState = {
    guilds: Record<string, StreamsMap>,
    admin: StreamsMap
}

function createStreamState<T>(type: API.EVENT_STREAM): API.Stream<T> {
    return {
        type,
        status: "idle",
        data: []
    }
}

function createInitialGuildState(): StreamsMap {
    return {
        "guild-module-instances": createStreamState<API.ModuleInstance>("guild-module-instances"),
        "members": createStreamState<API.Event<API.MemberEventMeta>>("members"),
        "messages": createStreamState<API.Event>("messages"),
        "voice": createStreamState<API.Event<API.VoiceEventMeta>>("voice"),
    }
}

function createInitialAdminState(): StreamsMap {
    return {
        "guilds": createStreamState<API.Event<API.GuildEventMeta>>("guilds"),
        "users": createStreamState<API.Event<API.UserEventMeta>>("users"),
        "module-instances": createStreamState<API.Event<API.ModuleInstanceEventMeta>>("module-instances")
    }
}

const initialState: SliceState = {
    admin: createInitialAdminState(),
    guilds: {}
}

function getStreamStore(state: SliceState, args: API.StreamArgs) {
    if (!args.guildId) {
        return state.admin
    }

    return state.guilds[args.guildId]
}

function getStream(state: SliceState, args: API.StreamArgs) {
    return getStreamStore(state, args)[args.eventStream]
}

const streamsSlice = createSlice({
    name: "streams",
    initialState,
    reducers: {
        subscribe: (state, action: PayloadAction<API.StreamArgs>) => {
            const newStreamState: API.Stream<any> = {
                type: action.payload.eventStream,
                status: "flowing",
                data: []
            }

            if (
                action.payload.guildId &&
                !state.guilds[action.payload.guildId]
            ) {
                state.guilds[action.payload.guildId] = createInitialGuildState()
            }

            getStreamStore(state, action.payload)[action.payload.eventStream] = newStreamState
        },

        unsubscribe: (state, action: PayloadAction<API.StreamArgs>) => {
            delete getStreamStore(state, action.payload)[action.payload.eventStream]
        },

        pause: (state, action: PayloadAction<API.StreamArgs>) => {
            const stream = getStream(state, action.payload)
            if (stream) {
                stream.status = "paused"
            }
        },

        resume: (state, action: PayloadAction<API.StreamArgs>) => {
            const stream = getStream(state, action.payload)
            if (stream) {
                stream.status = "flowing"
            }
        },

        data: (state, action: PayloadAction<{
            args: API.StreamArgs,
            data: any
        }>) => {
            const stream = getStream(state, action.payload.args)
            if (stream) {
                stream.data.push(...action.payload.data)
            }
        }
    },
    extraReducers: {
        [fetchGuilds.fulfilled.toString()]: (state, action: PayloadAction<API.Guild[]>) => {
            action.payload.forEach(guild => {
                if (!state.guilds[guild.id]) {
                    state.guilds[guild.id] = createInitialGuildState()
                }
            })
        }
    }
})

export function makeStreamStatusSelector(args: API.StreamArgs) {
    return (store: RootState) => getStream(store.streams, args)?.status
}

export function makeStreamDataSelector(args: API.StreamArgs) {
    return (store: RootState) => getStream(store.streams, args)?.data
}

export const { subscribe, unsubscribe, pause, resume, data } = streamsSlice.actions

export default streamsSlice.reducer
