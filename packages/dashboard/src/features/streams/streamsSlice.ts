import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { API } from "../../config/types"
import { RootState } from "../../store"
import { updateUserGuilds } from "../guilds/guildsSlice"

type StreamsMap = Partial<Record<API.EVENT_STREAM, API.Stream<any>>>
type SliceState = {
    guild: Record<string, StreamsMap>,
    user: StreamsMap,
    admin: StreamsMap
}

const STREAM_GROUPS: Record<keyof SliceState, API.EVENT_STREAM[]> = {
    user: [
        "user-guilds"
    ],
    guild: [
        "guild-module-instances",
        "members",
        "messages",
        "voice",
        "user-message-leaderboard",
        "user-voice-leaderboard"
    ],
    admin: [
        "guilds",
        "guilds-resources",
        "users",
        "module-instances",
        "module-shares"
    ]
}

function createStreamState<T>(type: API.EVENT_STREAM): API.Stream<T> {
    return {
        type,
        status: "idle",
        data: []
    }
}

function createInitialUserState(): StreamsMap {
    return {
        "user-guilds": createStreamState<API.Guild>("user-guilds")
    }
}

function createInitialGuildState(): StreamsMap {
    return {
        "guild-module-instances": createStreamState<API.ModuleInstance>("guild-module-instances"),
        "members": createStreamState<API.Event<API.MemberEventMeta>>("members"),
        "messages": createStreamState<API.Event>("messages"),
        "voice": createStreamState<API.Event<API.VoiceEventMeta>>("voice"),
        "user-message-leaderboard": createStreamState<[API.User, number]>("user-message-leaderboard"),
        "user-voice-leaderboard": createStreamState<[API.User, number]>("user-voice-leaderboard")
    }
}

function createInitialAdminState(): StreamsMap {
    return {
        "guilds": createStreamState<API.Event<API.GuildEventMeta>>("guilds"),
        "guilds-resources": createStreamState<API.Guild[]>("guilds-resources"),
        "users": createStreamState<API.Event<API.UserEventMeta>>("users"),
        "module-instances": createStreamState<API.Event<API.ModuleInstanceEventMeta>>("module-instances"),
        "module-shares": createStreamState<Record<string, number>>("module-shares")
    }
}

const initialState: SliceState = {
    admin: createInitialAdminState(),
    user: createInitialUserState(),
    guild: {}
}

function getStreamStore(state: SliceState, args: API.StreamArgs) {
    const groups = Object.keys(STREAM_GROUPS) as (keyof SliceState)[]

    const group = groups.find(group =>
        STREAM_GROUPS[group].includes(args.eventStream)
    )

    if (group) {
        if (group === "guild") {
            if (!args.guildId) {
                throw new Error(`Missing guild-id for stream: ${args.eventStream}`)
            }

            return state[group][args.guildId]
        }

        return state[group]
    }

    throw new Error(`Uncategorized stream: ${args.eventStream}`)
}

function getStream(state: SliceState, args: API.StreamArgs) {
    return getStreamStore(state, args)?.[args.eventStream]
}

const streamsSlice = createSlice({
    name: "streams",
    initialState,
    reducers: {
        subscribe: (state, action: PayloadAction<API.StreamArgs>) => {
            const newStreamState: API.Stream<any> = {
                type: action.payload.eventStream,
                status: "pending",
                data: []
            }

            if (
                action.payload.guildId &&
                !state.guild[action.payload.guildId]
            ) {
                state.guild[action.payload.guildId] = createInitialGuildState()
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
                if (stream.status === "pending") {
                    stream.status = "flowing"
                }
                
                stream.data = action.payload.data
            }
        }
    },
    extraReducers: {
        [updateUserGuilds.toString()]: (state, action: PayloadAction<API.Guild[]>) => {
            action.payload.forEach(guild => {
                if (!state.guild[guild.id]) {
                    state.guild[guild.id] = createInitialGuildState()
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
