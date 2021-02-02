import axios, { AxiosInstance } from "axios"

import format, { FORMATS } from "./format.js"
import { API } from "../config/types"

class HttpAPI {
    endpoint: string
    axios: AxiosInstance

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

    async getProfile() {
        return await this.axios.get<API.User>("/oauth/discord/profile")
            .then(format<API.User>(FORMATS.USER))
    }
}

export default HttpAPI