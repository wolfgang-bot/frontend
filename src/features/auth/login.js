import store from "../../store.js"
import { fetchUser } from "./authSlice.js"
import api from "../../api"
import { API_TOKEN } from "../../config/constants.js"

export default async function login() {
    try {
        await api.init(API_TOKEN)
    } catch {
        return
    }

    store.dispatch(fetchUser())
}