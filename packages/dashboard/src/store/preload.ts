import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_REDUX_SETTINGS_KEY } from "../config/constants"
import { LoadingState } from "../config/types"

function getSettingsState() {
    const json = localStorage.getItem(LOCAL_STORAGE_REDUX_SETTINGS_KEY)
    return json ? JSON.parse(json) : undefined
}

function getAuthState() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    return token ?
        {
            data: { token },
            status: "idle" as LoadingState
        } :
        undefined
}

function getPersistantState() {
    return {
        settings: getSettingsState(),
        auth: getAuthState()
    }
}

export default getPersistantState
