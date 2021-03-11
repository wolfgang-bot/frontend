import { io, Socket } from "socket.io-client"

import { API } from "../config/types"
import format, { FORMATS } from "./format"
import WebSocketReceiver from "./WebSocketReceiver"
import opener from "../components/ComponentOpener"
import Logger from "../utils/Logger"

class WebSocketAPI {
    endpoint: string
    socket?: Socket
    receiver?: WebSocketReceiver

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    /**
     * Initialize websocket api
     */
    async init(token: string) {
        await this.login(token)
        this.receiver = new WebSocketReceiver(this.socket!)
    }

    /**
     * Log into websocket api
     */
    async login(token: string) {
        this.socket = io(this.endpoint, {
            auth: {
                token
            }
        })

        await new Promise<void>((resolve, reject) => {
            this.socket!.on("connect", resolve)
            this.socket!.on("connect_error", reject)
        })
    }

    /**
     * Emit socket.io event and await server response
     */
    fetch<T = void>(event: string, ...args: any[]): Promise<API.Response<T>> {
        if (!this.socket) {
            throw new Error("The api needs to be initialized before making requests")
        }

        return new Promise((resolve, reject) => {
            Logger.info(`%c[${event}]`, "color:blue", args)

            this.socket!.emit(event, ...args, (res: API.Response<T>) => {
                Logger.info(
                    `%c[${event}]`, `color:${res.status === "error" ? "red" : "green"}`,
                    res
                )

                if (res.status === "error") {
                    opener.openSnackbar(`Error: ${res.message}`, "error")
                    reject(res)
                } else if (res.status === "ok") {
                    resolve(res)
                } else {
                    throw new Error(`Unkown status '${res.status}'`)
                }
            })
        })
    }

    /**
     * @fires get:guilds
     */
    async getGuilds() {
        const data = await this.fetch<API.Guild[]>("get:guilds")
        return format<API.Guild[]>(FORMATS.GUILDS)(data)
    }

    /**
     * @fires get:guild/member-count
     */
    getMemberCount(guildId: string) {
        return this.fetch<API.MemberCount>("get:guild/member-count", guildId)
    }

    /**
     * @fires get:guild/channels
     */
    getGuildChannels(guildId: string) {
        return this.fetch<API.GuildChannel[]>("get:guild/channels", guildId)
    }

    /**
     * @fires get:guild/roles
     */
    getGuildRoles(guildId: string) {
        return this.fetch<API.Role[]>("get:guild/roles", guildId)
    }

    /**
     * @fires get:modules
     */
    async getModules() {
        const data = await this.fetch<API.Module[]>("get:modules")
        return format<API.Module[]>(FORMATS.MODULES)(data)
    }

    /**
     * @fires get:module-instances
     */
    getModuleInstances(guildId: string) {
        return this.fetch<API.ModuleInstance[]>("get:module-instances", guildId)
    }

    /**
     * @fires post:module-instances/start
     */
    startModuleInstance(guildId: string, moduleKey: string, config: Record<string, any>) {
        return this.fetch("post:module-instances/start", guildId, moduleKey, config)
    }

    /**
     * @fires post:module-instances/stop
     */
    stopModuleInstance(guildId: string, moduleKey: string) {
        return this.fetch("post:module-instances/stop", guildId, moduleKey)
    }
    
    /**
     * @fires post:module-instances/restart
     */
    restartModuleInstance(guildId: string, moduleKey: string) {
        return this.fetch("post:module-instances/restart", guildId, moduleKey)
    }

    /**
     * @fires post:module-instance/config
     */
    updateModuleInstanceConfig(guildId: string, moduleKey: string, newConfig: object) {
        return this.fetch("post:module-instances/config", guildId, moduleKey, newConfig)
    }

    /**
     * @fires post:stream/subscribe
     */
    subscribeToStream(eventStream: API.EVENT_STREAM, guildId: string) {
        return this.fetch("post:stream/subscribe", eventStream, { guildId })
    }

    /**
     * @fires post:stream/unsubscribe
     */
    unsubscribeFromStream(eventStream: API.EVENT_STREAM, guildId: string) {
        return this.fetch("post:stream/unsubscribe", eventStream, { guildId })
    }

    /**
     * @fires post:stream/pause
     */
    pauseStream(eventStream: API.EVENT_STREAM, guildId: string) {
        return this.fetch("post:stream/pause", eventStream, { guildId })
    }

    /**
     * @fires post:stream/resume
     */
    resumeStream(eventStream: API.EVENT_STREAM, guildId: string) {
        return this.fetch("post:stream/resume", eventStream, { guildId })
    }
}

export default WebSocketAPI
