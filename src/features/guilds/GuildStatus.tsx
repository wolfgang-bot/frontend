import React from "react"
import { CircularProgress } from "@material-ui/core"
import InactiveIcon from "@material-ui/icons/Close"
import ActiveIcon from "@material-ui/icons/Check"

import { API, GUILD_STATUS } from "../../config/types"

function GuildStatus({ guild }: { guild: API.Guild }) {
    if (guild.status === GUILD_STATUS.ACTIVE) {
        return <ActiveIcon/>
    }

    if (guild.status === GUILD_STATUS.PENDING) {
        return <CircularProgress size={24}/>
    }

    return <InactiveIcon/>
}

export default GuildStatus
