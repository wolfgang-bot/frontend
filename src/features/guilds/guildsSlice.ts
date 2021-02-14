import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { API, Discord, ReduxAPIState } from "../../config/types"
import { ThunkExtraArgument } from "../../store"

const initialState: ReduxAPIState<Record<string, API.Guild>> = {
    data: {},
    status: "idle"
}

export const fetchGuilds = createAsyncThunk<
    API.Guild[] | undefined,
    void,
    { extra: ThunkExtraArgument }
>(
    "guilds/fetchGuilds",
    async (_, { extra: { api } }) => {
        const res = await api.ws.getGuilds()
        return res.data
    }
)

export const fetchChannels = createAsyncThunk<
    API.GuildChannel[] | undefined,
    string,
    { extra: ThunkExtraArgument }
>(
    "guilds/fetchChannels",
    async (guildId, { extra: { api } }) => {
        const res = await api.ws.getGuildChannels(guildId)
        return res.data
    }
)

export const fetchConfig = createAsyncThunk<
    object | undefined,
    string,
    { extra: ThunkExtraArgument }
>(
    "guilds/fetchConfig",
    async (guildId, { extra: { api } }) => {
        const res = await api.ws.getConfigDescriptive(guildId)
        return res.data
    }
)

export const updateConfig = createAsyncThunk<
    API.DescriptiveConfig | undefined,
    { guildId: string, value: API.Config },
    { extra: ThunkExtraArgument }
>(
    "guilds/updateConfig",
    async ({ guildId, value }, { extra: { api } }) => {
        const res = await api.ws.updateConfig(guildId, value)
        return res.data
    },
    {
        // Accept nested error object (nested objects are removed by default)
        serializeError: (value: any) => (value as API.Response<void>)?.message
    }
)

export const fetchLocale = createAsyncThunk<
    API.Locale | undefined,
    string,
    { extra: ThunkExtraArgument }
>(
    "guilds/fetchLocale",
    async (guildId, { extra: { api } }) => {
        const res = await api.ws.getLocale(guildId)
        return res.data
    }
)

export const updateLocale = createAsyncThunk<
    void,
    { guildId: string, value: API.Locale },
    { extra: ThunkExtraArgument }
>(
    "guilds/updateLocale",
    async ({ guildId, value }, { extra: { api } }) => {
        await api.ws.updateLocale(guildId, value)
    }
)

export const fetchMemberCount = createAsyncThunk<
    API.MemberCount | undefined,
    string,
    { extra: ThunkExtraArgument }
>(
    "guilds/fetchMemberCount",
    async (guildId, { extra: { api } }) => {
        const res = await api.ws.getMemberCount(guildId)
        return res.data
    }
)

const guildsSlice = createSlice({
    name: "guild",
    initialState,
    reducers: {},
    extraReducers: {
        /**
         * Thunk: guilds/fetchConfig
         */
        [fetchGuilds.pending.toString()]: (state) => {
            state.status = "pending"
        },
        [fetchGuilds.fulfilled.toString()]: (state, action: PayloadAction<API.Guild[]>) => {
            state.status = "success"
            action.payload.forEach(guild => {
                state.data[guild.id] = guild
            })
        },
        [fetchGuilds.rejected.toString()]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        },

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
         * Thunk: guilds/fetchConfig
         */
        [fetchConfig.pending.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.config.status = "pending"
            }
        },
        [fetchConfig.fulfilled.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.config.data = action.payload
                guild.config.status = "success"
            }
        },
        [fetchConfig.rejected.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.config.error = action.payload
                guild.config.status = "error"
            }
        },

        /**
         * Thunk: guilds/updateConfig
         */
        [updateConfig.fulfilled.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg.guildId]
            if (guild) {
                guild.config.data = action.payload
            }
        },

        /**
         * Thunk: guilds/fetchLocale
         */
        [fetchLocale.pending.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.locale.status = "pending"
            }
        },
        [fetchLocale.fulfilled.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.locale.data = action.payload
                guild.locale.status = "success"
            }
        },
        [fetchLocale.rejected.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg]
            if (guild) {
                guild.locale.error = action.payload
                guild.locale.status = "error"
            }
        },

        /**
         * Thunk: guilds/updateLocale
         */
        [updateLocale.fulfilled.toString()]: (state, action) => {
            const guild = state.data[action.meta.arg.guildId]
            if (guild) {
                guild.locale.data = action.meta.arg.value
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

export default guildsSlice.reducer