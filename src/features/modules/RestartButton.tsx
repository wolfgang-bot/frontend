import React from "react"
import RestartIcon from "@material-ui/icons/Replay"

import { API } from "../../config/types"
import ActionButton from "./ActionButton"
import api from "../../api"

type Props = {
    module: API.Module,
    guild: API.Guild,
    onUpdate: () => Promise<void>
} & Partial<React.ComponentProps<typeof ActionButton>>

function RestartButton({ module, guild, onUpdate, ...props }: Props) {
    const handleClick = async () => {
        api.ws.restartModuleInstance(guild.id, module.name)
    }

    return (
        <ActionButton
            icon={RestartIcon}
            onClick={handleClick}
            {...props}
        />
    )
}

export default RestartButton