import { API_BASE_URL, WEB_SOCKET_API_URL } from "../config/constants"
import API from "./API"

const api = new API({
    httpEndpoint: API_BASE_URL,
    webSocketEndpoint: WEB_SOCKET_API_URL
})

export default api