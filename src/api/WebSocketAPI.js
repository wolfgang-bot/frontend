import { io } from "socket.io-client"

import format, { GUILDS } from "./format.js"
import { DEBUG } from "../config/constants.js"

class WebSocketAPI {
    endpoint
    socket

    /**
     * @param {String} endpoint 
     */
    constructor(endpoint) {
        this.endpoint = endpoint
    }

    /**
     * Emit socket.io event and await server response
     * 
     * @param {String} event
     * @param {...Any} args
     */
    fetch(event, ...args) {
        if (!this.socket) {
            throw new Error("You need to initialize the api before making requests")
        }

        return new Promise((resolve, reject) => {
            this.socket.emit(event, ...args, (res) => {
                if (DEBUG) {
                    console.log(`%c[${event}]`, "color:blue", res)
                }

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
     * Initialize websocket api
     * 
     * @param {String} token 
     */
    async init(token) {
        await this.login(token)
    }

    /**
     * Log into websocket api
     * 
     * @param {String} token 
     */
    async login(token) {
        this.socket = io(this.endpoint, {
            auth: {
                token
            }
        })

        await new Promise((resolve, reject) => {
            this.socket.on("connect", resolve)
            this.socket.on("connect_error", reject)
        })
    }

    /**
     * @fires get:guilds
     */
    async getGuilds() {
        const data = await this.fetch("get:guilds")
        return format(GUILDS)(data)
    }

    /**
     * @fires get:config-descriptive
     * 
     * @param {String} guildId
     */
    getConfigDescriptive(guildId) {
        return this.fetch("get:config-descriptive", guildId)
    }

    /**
     * @fires post:config
     * 
     * @param {String} guildId 
     * @param {Object} newValue 
     */
    updateConfig(guildId, newValue) {
        return this.fetch("post:config", guildId, newValue)
    }

    /**
     * @fires get:modules
     */
    getModules() {
        return this.fetch("get:modules")
    }

    /**
     * @fires get:module-instances
     * 
     * @param {String} guildId
     */
    getModuleInstances(guildId) {
        return this.fetch("get:module-instances", guildId)
    }

    /**
     * @fires post:module-instances/start
     * 
     * @param {String} guildId
     * @param {String} moduleName
     * @param {Array<String>} args
     */
    startModuleInstance(guildId, moduleName, args) {
        return this.fetch("post:module-instances/start", guildId, moduleName, ["778576977103421453"])
    }

    /**
     * @fires post:module-instances/stop
     * 
     * @param {String} guildId
     * @param {String} moduleName
     */
    stopModuleInstance(guildId, moduleName) {
        return this.fetch("post:module-instances/stop", guildId, moduleName)
    }
    
    /**
     * @fires post:module-instances/restart
     * 
     * @param {String} guildId
     * @param {String} moduleName
     */
    restartModuleInstance(guildId, moduleName) {
        return this.fetch("post:module-instances/restart", guildId, moduleName)
    }
}

export default WebSocketAPI