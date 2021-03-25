import React from "react"

import StartModuleDialog from "./StartModuleDialog"
import GuildSettingsDialog from "./GuildSettingsDialog"
import InstanceConfigDialog from "./InstanceConfigDialog"

const dialogs: Record<string, React.FunctionComponent<any>> = {
    StartModuleDialog,
    GuildSettingsDialog,
    InstanceConfigDialog
}

export default dialogs
