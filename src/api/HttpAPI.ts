import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

import format, { FORMATS } from "./format"
import { API } from "../config/types"

class HttpAPI {
    endpoint: string
    axios?: AxiosInstance

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    init() {
        this.axios = axios.create({
            baseURL: this.endpoint
        })
    }

    login(token: string) {
        if (!this.axios) {
            return
        }

        this.axios.defaults.headers = {
            "Authorization": "Baerer " + token
        }
    }

    fetch<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        if (!this.axios) {
            throw new Error('The api needs to be initialized before making requests')
        }

        return this.axios(config)
    }

    get<T>(url: string) {
        return this.fetch<T>({ method: "get", url })
    }

    async getProfile() {
        return await this.get<API.User>("/oauth/discord/profile")
            .then(format<API.User>(FORMATS.USER))
    }

    async getModules() {
        return await this.get<API.Module[]>("/modules")
            .then(format<API.Module[]>(FORMATS.MODULES))
    }

    async getCommands() {
        return await this.get<API.Command[]>("/commands")
    }
}

export default HttpAPI