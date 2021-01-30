import axios from "axios"

import format, { USER } from "./format.js"

class HttpAPI {
    endpoint
    axios

    constructor(endpoint) {
        this.endpoint = endpoint
    }

    init(token) {
        this.axios = axios.create({
            baseURL: this.endpoint,
            headers: {
                "Authorization": "Baerer " + token
            }
        })
    }

    getProfile() {
        return this.axios.get("/oauth/discord/profile").then(format(USER))
    }
}

export default HttpAPI