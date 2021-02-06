import { API } from "../config/types"
import { DISCORD_CDN_BASE_URL, DEFAULT_AVATAR_URL } from "../config/constants"

export enum FORMATS {
    USER,
    GUILD,
    GUILDS
}

type Response<T> = {
    data?: T,
    [key: string]: any
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
    guild.channels = {
        data: {},
        status: "idle"
    }
    if (guild.icon) {
        guild.icon = `${DISCORD_CDN_BASE_URL}/icons/${guild.id}/${guild.icon}.png`
        guild.icon_animated = `${DISCORD_CDN_BASE_URL}/icons/${guild.id}/${guild.icon}`
    }
}

export default function format<T>(type: FORMATS) {
    let fn: Function

    if (type === FORMATS.USER) {
        fn = (data: Response<API.User>) => formatUser(data.data!)
    } else if (type === FORMATS.GUILD) {
        fn = (data: Response<API.Guild>) => formatGuild(data.data!)
    } else if (type === FORMATS.GUILDS) {
        fn = (data: Response<API.Guild[]>) => data.data!.map(formatGuild)
    }

    return (data: Response<T>) => {
        return new Promise<Response<T>>(resolve => {
            fn(data)
            resolve(data)
        })
    }
}