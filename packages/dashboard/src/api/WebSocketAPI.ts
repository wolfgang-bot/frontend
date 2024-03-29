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
            },
            transports: ["websocket"]
        })

        await new Promise<void>((resolve, reject) => {
            this.socket!.on("connect", resolve)
            this.socket!.on("connect_error", reject)
        })
    }

    /**
     * Emit socket.io event and await server response
     */
    fetch<T = void>(event: string, arg: object = {}): Promise<API.Response<T>> {
        if (!this.socket) {
            throw new Error("The api needs to be initialized before making requests")
        }

        return new Promise((resolve, reject) => {
            Logger.info(`%c[${event}]`, "color:blue", arg)

            this.socket!.emit(event, arg, (res: API.Response<T>) => {
                Logger.info(
                    `%c[${event}]`, `color:${res.status === "error" ? "red" : "green"}`,
                    res
                )

                if (res.status === "error") {
                    this.handleError(res)
                    reject(res)
                } else if (res.status === "ok") {
                    resolve(res)
                } else {
                    throw new Error(`Unkown status '${res.status}'`)
                }
            })
        })
    }

    handleError(res: API.Response<any>) {
        const errorMessage = typeof res.message === "string" ?
            `Error: ${res.message}` :
            "Error"
        opener.openSnackbar(errorMessage, "error")
    }

    /**
     * @fires get:guild/member-count
     */
    getMemberCount(args: { guildId: string }) {
        return this.fetch<number>("get:guild/member-count", args)
    }

    /**
     * @fires get:guild/channels
     */
    getGuildChannels(args: { guildId: string }) {
        return this.fetch<API.GuildChannel[]>("get:guild/channels", args)
    }

    /**
     * @fires get:guild/roles
     */
    getGuildRoles(args: { guildId: string }) {
        return this.fetch<API.Role[]>("get:guild/roles", args)
    }

    /**
     * @fires get:modules
     */
    async getModules(args: { guildId: string }) {
        const data = await this.fetch<API.Module[]>("get:modules", args)
        return format<API.Module[]>(FORMATS.MODULES)(data)
    }

    /**
     * @fires get:module-instances
     */
    getModuleInstances(args: { guildId: string }) {
        return this.fetch<API.ModuleInstance[]>("get:module-instances", args)
    }

    /**
     * @fires post:modules/validate-args
     */
    validateArguments(args: { guildId: string, moduleKey: string, args: Record<string, any> }) {
        return this.fetch("post:modules/validate-args", args)
    }

    /**
     * @fires post:module-instances/start
     */
    startModuleInstance(args: { guildId: string, moduleKey: string, args: Record<string, any> }) {
        return this.fetch("post:module-instances/start", args)
    }

    /**
     * @fires post:module-instances/stop
     */
    stopModuleInstance(args: { instanceId: string }) {
        return this.fetch("post:module-instances/stop", args)
    }
    
    /**
     * @fires post:module-instances/restart
     */
    restartModuleInstance(args: { instanceId: string }) {
        return this.fetch("post:module-instances/restart", args)
    }

    /**
     * @fires post:module-instance/config
     */
    updateModuleInstanceConfig(args: { instanceId: string, newConfig: object }) {
        return this.fetch("post:module-instances/config", args)
    }

    /**
     * @fires post:stream/subscribe
     */
    subscribeToStream(args: API.StreamArgs) {
        return this.fetch("post:stream/subscribe", args)
    }

    /**
     * @fires post:stream/unsubscribe
     */
    unsubscribeFromStream(args: API.StreamArgs) {
        return this.fetch("post:stream/unsubscribe", args)
    }

    /**
     * @fires post:stream/pause
     */
    pauseStream(args: API.StreamArgs) {
        return this.fetch("post:stream/pause", args)
    }

    /**
     * @fires post:stream/resume
     */
    resumeStream(args: API.StreamArgs) {
        return this.fetch("post:stream/resume", args)
    }

    /**
     * @fires get:admins
     */
    async getAdmins() {
        const data = await this.fetch<API.Admin[]>("get:admins")
        return format<API.Admin[]>(FORMATS.ADMINS)(data)
    }

    /**
     * @fires post:admins/create
     */
    async createAdmin(args: { userId: string }) {
        const data = await this.fetch<API.Admin>("post:admins/create", args)
        return format<API.Admin>(FORMATS.ADMIN)(data)
    }

    /**
     * @fires post:admins/remove
     */
    async removeAdmin(args: { id: string }) {
        const data = await this.fetch<API.Admin>("post:admins/remove", args)
        return format<API.Admin>(FORMATS.ADMIN)(data)
    }
}

export default WebSocketAPI
