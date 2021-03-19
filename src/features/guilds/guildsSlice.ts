import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { API, Discord, ReduxAPIState } from "../../config/types"
import { ThunkExtraArgument } from "../../store"

const initialState: ReduxAPIState<Record<string, API.Guild>> = {
    data: {},
    status: "idle"
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
        updateGuilds: (state, action: PayloadAction<API.Guild[]>) => {
            state.status = "success"

            action.payload.forEach(guild => {
                state.data[guild.id] = guild
            })
        }
    },
    extraReducers: {
        /**
         * Thunk: guilds/fetchChannels
         */
        [fetchChannels.pending.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.channels.status = "pending"
            }
        },
        [fetchChannels.fulfilled.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                action.payload.forEach((channel: Discord.GuildChannel) => {
                    guild.channels.data[channel.id] = channel
                })
                guild.channels.status = "success"
            }
        },
        [fetchChannels.rejected.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.channels.error = action.payload
                guild.channels.status = "error"
            }
        },

        /**
         * Thunk: guilds/fetchRoles
         */
        [fetchRoles.pending.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.roles.status = "pending"
            }
        },
        [fetchRoles.fulfilled.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                action.payload.forEach((role: Discord.Role) => {
                    guild.roles.data[role.id] = role
                })
                guild.roles.status = "success"
            }
        },
        [fetchRoles.rejected.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.roles.error = action.payload
                guild.roles.status = "error"
            }
        },

        /**
         * Thunk: guilds/fetchMemberCount
         */
        [fetchMemberCount.pending.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.memberCount.status = "pending"
            }
        },
        [fetchMemberCount.fulfilled.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.memberCount.data = action.payload
                guild.memberCount.status = "success"
            }
        },
        [fetchMemberCount.rejected.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.memberCount.error = action.payload
                guild.memberCount.status = "error"
            }
        },
    }
})

export const { updateGuilds } = guildsSlice.actions
export default guildsSlice.reducer
