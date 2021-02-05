import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

import format, { FORMATS } from "./format"
import { API } from "../config/types"

class HttpAPI {
    endpoint: string
    axios?: AxiosInstance

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    init(token: string) {
        this.axios = axios.create({
            baseURL: this.endpoint,
            headers: {
                "Authorization": "Baerer " + token
            }
        })
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
}

export default HttpAPI