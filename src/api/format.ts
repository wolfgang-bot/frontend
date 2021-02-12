import { API, ReduxAPIState } from "../config/types"
import { DISCORD_CDN_BASE_URL, DEFAULT_AVATAR_URL, STORAGE_BASE_URL } from "../config/constants"

export enum FORMATS {
    USER,
    GUILD,
    GUILDS,
    MODULE,
    MODULES
}

type Response<T> = {
    data?: T,
    [key: string]: any
}

function makeReduxAPIState<T>(data: T): ReduxAPIState<T> {
    return {
        data,
        status: "idle"
    }
}

function formatUser(user: API.User) {
    if (user.avatar) {
        user.avatar = `${DISCORD_CDN_BASE_URL}/avatars/${user.id}/${user.avatar}.png`
        user.avatar_animated = `${DISCORD_CDN_BASE_URL}/avatars/${user.id}/${user.avatar}`
    } else if (user.discriminator) {
        user.avatar = user.avatar_animated = DEFAULT_AVATAR_URL.replace(/{}/g, (user.discriminator % 5).toString())
    }
}

function formatGuild(guild: API.Guild) {
    guild.channels = makeReduxAPIState<Record<string, API.GuildChannel>>({})
    guild.config = makeReduxAPIState<API.DescriptiveConfig>({
        value: null
    })

    if (guild.icon) {
        guild.icon = `${DISCORD_CDN_BASE_URL}/icons/${guild.id}/${guild.icon}.png`
        guild.icon_animated = `${DISCORD_CDN_BASE_URL}/icons/${guild.id}/${guild.icon}`
    }
}

function formatModule(module: API.Module) {
    module.icon = `${STORAGE_BASE_URL}/modules/${module.key}/icon.png`
}

const formatterMap: Record<FORMATS, (data: Response<any>) => void> = {
    [FORMATS.USER]: (data: Response<API.User>) => formatUser(data.data!),
    [FORMATS.GUILD]: (data: Response<API.Guild>) => formatGuild(data.data!),
    [FORMATS.GUILDS]: (data: Response<API.Guild[]>) => data.data!.map(formatGuild),
    [FORMATS.MODULE]: (data: Response<API.Module>) => formatModule(data.data!),
    [FORMATS.MODULES]: (data: Response<API.Module[]>) => data.data!.map(formatModule)
}

export default function format<T>(type: FORMATS) {
    let fn = formatterMap[type]

    return (data: Response<T>) => {
        return new Promise<Response<T>>(resolve => {
            fn(data)
            resolve(data)
        })
    }
}