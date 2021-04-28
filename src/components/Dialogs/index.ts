import React from "react"

import ConfirmDialog from "./ConfirmDialog"
import GuildSettingsDialog from "./GuildSettingsDialog"

const dialogs: Record<string, React.FunctionComponent<any>> = {
    ConfirmDialog,
    GuildSettingsDialog
}

export default dialogs
