import React from "react"

import ModuleStartDialog from "./ModuleStartDialog"
import GuildSettingsDialog from "./GuildSettingsDialog"
import InstanceConfigDialog from "./InstanceConfigDialog"

const dialogs: Record<string, React.FunctionComponent<any>> = {
    ModuleStartDialog,
    GuildSettingsDialog,
    InstanceConfigDialog
}

export default dialogs
