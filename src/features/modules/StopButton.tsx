import React from "react"
import StopIcon from "@material-ui/icons/Stop"

import { API } from "../../config/types"
import ActionButton from "./ActionButton"
import api from "../../api"

type Props = {
    module: API.Module,
    guild: API.Guild,
    onUpdate: () => Promise<void>
} & Partial<React.ComponentProps<typeof ActionButton>>

function StartButton({ module, guild, onUpdate, ...props }: Props) {
    const handleClick = async () => {
        api.ws.stopModuleInstance(guild.id, module.name)
    }

    return (
        <ActionButton
            icon={StopIcon}
            onClick={handleClick}
            {...props}
        />
    )
}

export default StartButton