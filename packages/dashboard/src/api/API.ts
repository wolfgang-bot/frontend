import HttpAPI from "./HttpAPI"
import WebSocketAPI from "./WebSocketAPI"

class API {
    http: HttpAPI
    ws: WebSocketAPI
    
    constructor({ httpEndpoint, webSocketEndpoint }: {
        httpEndpoint: string,
        webSocketEndpoint: string
    }) {
        this.http = new HttpAPI(httpEndpoint)
        this.ws = new WebSocketAPI(webSocketEndpoint)

        this.init()
    }

    async init() {
        this.http.init()
    }

    async login(token: string) {
        this.http.login(token)
        await this.ws.init(token)
    }
}

export default API