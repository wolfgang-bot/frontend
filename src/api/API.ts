import HttpAPI from "./HttpAPI.js"
import WebSocketAPI from "./WebSocketAPI.js"

class API {
    http: HttpAPI
    ws: WebSocketAPI
    
    constructor({ httpEndpoint, webSocketEndpoint }: {
        httpEndpoint: string,
        webSocketEndpoint: string
    }) {
        this.http = new HttpAPI(httpEndpoint)
        this.ws = new WebSocketAPI(webSocketEndpoint)
    }

    async init(token: string) {
        this.http.init(token)
        await this.ws.init(token)
    }
}

export default API