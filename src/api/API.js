import HttpAPI from "./HttpAPI.js"
import WebSocketAPI from "./WebSocketAPI.js"

class API {
    http
    ws
    
    constructor({ httpEndpoint, webSocketEndpoint }) {
        this.http = new HttpAPI(httpEndpoint)
        this.ws = new WebSocketAPI(webSocketEndpoint)
    }

    async init(token) {
        this.http.init(token)
        await this.ws.init(token)
    }
}

export default API