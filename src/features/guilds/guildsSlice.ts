import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import { API, Discord, ReduxAPIState } from "../../config/types"
import api from "../../api"

const initialState: ReduxAPIState<Record<string, API.Guild>> = {
    data: {},
    status: "idle"
}

export const fetchGuilds = createAsyncThunk("guilds/fetchGuilds", async () => {
    const res = await api.ws.getGuilds()
    return res.data
})

export const fetchChannels = createAsyncThunk<
    API.GuildChannel[] | undefined,
    string
>(
    "guilds/fetchChannels",
    async (guildId) => {
        const res = await api.ws.getGuildChannels(guildId)
        return res.data
    }
)

const guildsSlice = createSlice({
    name: "guild",
    initialState,
    reducers: {},
    extraReducers: {
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
        }
    }
})

export default guildsSlice.reducer