import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { API, Discord, ReduxAPIState } from "../../config/types"
import { ThunkExtraArgument } from "../../store"

type SliceState = {
    user: ReduxAPIState<Record<string, API.Guild>>,
    global: ReduxAPIState<Record<string, API.Guild>>
}

const initialState: SliceState = {
    user: {
        data: {},
        status: "idle"
    },
    global: {
        data: {},
        status: "idle"
    }
}

export const fetchChannels = createAsyncThunk<
    API.GuildChannel[] | undefined,
    string,
    { extra: ThunkExtraArgument }
>(
    "guilds/fetchChannels",
    async (guildId, { extra: { api } }) => {
        const res = await api.ws.getGuildChannels({ guildId })
        return res.data
    }
)

export const fetchRoles = createAsyncThunk<
    API.Role[] | undefined,
    string,
    { extra: ThunkExtraArgument }
>(
    "guilds/fetchRoles",
    async (guildId, { extra: { api } }) => {
        const res = await api.ws.getGuildRoles({ guildId })
        return res.data
    }
)

export const fetchMemberCount = createAsyncThunk<
    number | undefined,
    string,
    { extra: ThunkExtraArgument }
>(
    "guilds/fetchMemberCount",
    async (guildId, { extra: { api } }) => {
        const res = await api.ws.getMemberCount({ guildId })
        return res.data
    }
)

const guildsSlice = createSlice({
    name: "guild",
    initialState,
    reducers: {
        updateUserGuilds: (state, action: PayloadAction<API.Guild[]>) => {
            state.user.status = "success"
            action.payload.forEach(guild => {
                state.user.data[guild.id] = guild
            })
        },
        updateGlobalGuilds: (state, action: PayloadAction<API.Guild[]>) => {
            state.global.status = "success"
            action.payload.forEach(guild => {
                state.global.data[guild.id] = guild
            })
        }
    },
    extraReducers: {
        /**
         * Thunk: guilds/fetchChannels
         */
        [fetchChannels.pending.toString()]: (state, action) => {
            const guild = state.user.data[action.meta.arg]
            if (guild) {
                guild.channels.status = "pending"
            }
        },
        [fetchChannels.fulfilled.toString()]: (state, action) => {
            const guild = state.user.data[action.meta.arg]
            if (guild) {
                action.payload.forEach((channel: Discord.GuildChannel) => {
                    guild.channels.data[channel.id] = channel
                })
                guild.channels.status = "success"
            }
        },
        [fetchChannels.rejected.toString()]: (state, action) => {
            const guild = state.user.data[action.meta.arg]
            if (guild) {
                guild.channels.error = action.payload
                guild.channels.status = "error"
            }
        },

        /**
         * Thunk: guilds/fetchRoles
         */
        [fetchRoles.pending.toString()]: (state, action) => {
            const guild = state.user.data[action.meta.arg]
            if (guild) {
                guild.roles.status = "pending"
            }
        },
        [fetchRoles.fulfilled.toString()]: (state, action) => {
            const guild = state.user.data[action.meta.arg]
            if (guild) {
                action.payload.forEach((role: Discord.Role) => {
                    guild.roles.data[role.id] = role
                })
                guild.roles.status = "success"
            }
        },
        [fetchRoles.rejected.toString()]: (state, action) => {
            const guild = state.user.data[action.meta.arg]
            if (guild) {
                guild.roles.error = action.payload
                guild.roles.status = "error"
            }
        },

        /**
         * Thunk: guilds/fetchMemberCount
         */
        [fetchMemberCount.pending.toString()]: (state, action) => {
            const guild = state.user.data[action.meta.arg]
            if (guild) {
                guild.memberCount.status = "pending"
            }
        },
        [fetchMemberCount.fulfilled.toString()]: (state, action) => {
            const guild = state.user.data[action.meta.arg]
            if (guild) {
                guild.memberCount.data = action.payload
                guild.memberCount.status = "success"
            }
        },
        [fetchMemberCount.rejected.toString()]: (state, action) => {
            const guild = state.user.data[action.meta.arg]
            if (guild) {
                guild.memberCount.error = action.payload
                guild.memberCount.status = "error"
            }
        },
    }
})

export const { updateUserGuilds, updateGlobalGuilds } = guildsSlice.actions
export default guildsSlice.reducer
