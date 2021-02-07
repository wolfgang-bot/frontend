import { io, Socket } from "socket.io-client"

import { API } from "../config/types"
import format, { FORMATS } from "./format"
import { DEBUG } from "../config/constants"
import WebSocketReceiver from "./WebSocketReceiver"

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

        await new Promise((resolve, reject) => {
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
            console.log(`%c[${event}]`, "color:blue")

            this.socket!.emit(event, ...args, (res: API.Response<T>) => {
                console.log(`%c[${event}]`, "color:green", res)

                if (res.status === "error") {
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
     * @fires get:guild/channels
     */
    async getGuildChannels(guildId: string) {
        return this.fetch<API.GuildChannel[]>("get:guild/channels", guildId)
    }

    /**
     * @fires get:config-descriptive
     * 
     * @param {String} guildId
     */
    getConfigDescriptive(guildId: string) {
        return this.fetch<API.DescriptiveConfig>("get:config-descriptive", guildId)
    }

    /**
     * @fires post:config
     */
    updateConfig(guildId: string, newValue: object) {
        return this.fetch("post:config", guildId, newValue)
    }

    /**
     * @fires get:modules
     */
    getModules() {
        return this.fetch<API.Module[]>("get:modules")
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
    startModuleInstance(guildId: string, moduleName: string, args: string[]) {
        return this.fetch("post:module-instances/start", guildId, moduleName, args)
    }

    /**
     * @fires post:module-instances/stop
     */
    stopModuleInstance(guildId: string, moduleName: string) {
        return this.fetch("post:module-instances/stop", guildId, moduleName)
    }
    
    /**
     * @fires post:module-instances/restart
     */
    restartModuleInstance(guildId: string, moduleName: string) {
        return this.fetch("post:module-instances/restart", guildId, moduleName)
    }
}

export default WebSocketAPI