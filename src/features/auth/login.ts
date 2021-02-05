import store from "../../store"
import { fetchUser } from "./authSlice"
import api from "../../api"
import { API_TOKEN } from "../../config/constants"

export default async function login() {
    if (!API_TOKEN) {
        return
    }

    try {
        await api.init(API_TOKEN)
    } catch {
        console.error("Failed to initialize the API")
        return
    }

    store.dispatch(fetchUser())
}