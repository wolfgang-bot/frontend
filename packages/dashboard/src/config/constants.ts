export const DEBUG = process.env.NODE_ENV === "development"

export const API_BASE_URL = window.location.origin + "/api"
export const STORAGE_BASE_URL = window.location.origin + "/storage"
export const WEB_SOCKET_API_URL = `ws://${window.location.host}`

export const DISCORD_OAUTH_API_ENDPOINT = API_BASE_URL + "/oauth/discord"
export const DISCORD_OAUTH_URL =
    `https://discord.com/api/oauth2/authorize?client_id=${
        process.env.REACT_APP_DISCORD_BOT_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
        DISCORD_OAUTH_API_ENDPOINT
    )}&response_type=code&scope=identify%20guilds`
export const DISCORD_CDN_BASE_URL = "https://cdn.discordapp.com"

export const DEFAULT_AVATAR_URL = "https://cdn.discordapp.com/embed/avatars/{}.png"

export const DISCORD_BOT_INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${
        process.env.REACT_APP_DISCORD_BOT_CLIENT_ID
    }&scope=bot&permissions=1345535071`

export const LOCAL_STORAGE_REDUX_SETTINGS_KEY = "settings"
export const LOCAL_STORAGE_TOKEN_KEY = "token"

export const COLORS = [
    "#f1c40f",
    "#9b59b6",
    "#2ecc71",
    "#34495e",
    "#e74c3c",
    "#1abc9c",
    "#e67e22",
    "#3498db",
    "#ecf0f1",
    "#95a5a6"
]
