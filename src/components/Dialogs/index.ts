import React from "react"

import StartModuleDialog from "./StartModuleDialog"
import GuildSettingsDialog from "./GuildSettingsDialog"

const dialogs: Record<string, React.FunctionComponent<any>> = {
    StartModuleDialog,
    GuildSettingsDialog
}

export default dialogs
