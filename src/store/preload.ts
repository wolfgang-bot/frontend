import { LOCAL_STORAGE_REDUX_SETTINGS_KEY } from "../config/constants"

function getSettingsState() {
    const json = localStorage.getItem(LOCAL_STORAGE_REDUX_SETTINGS_KEY)
    return json ? JSON.parse(json) : undefined
}

function getPersistantState() {
    return {
        settings: getSettingsState()
    }
}

export default getPersistantState