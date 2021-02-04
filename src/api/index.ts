import { API_BASE_URL, WEB_SOCKET_API_URL } from "../config/constants.js"
import API from "./API.js"

const api = new API({
    httpEndpoint: API_BASE_URL,
    webSocketEndpoint: WEB_SOCKET_API_URL
})

export default api