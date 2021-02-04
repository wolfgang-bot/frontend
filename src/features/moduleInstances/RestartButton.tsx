import React from "react"
import RestartIcon from "@material-ui/icons/Replay"

import { API } from "../../config/types"
import ActionButton from "./ActionButton"

type Props = {
    instance: API.ModuleInstance,
    guild: API.Guild,
    onUpdate: () => Promise<void>
} & Partial<React.ComponentProps<typeof ActionButton>>

function RestartButton({ instance, guild, onUpdate, ...props }: Props) {
    const handleClick = async () => {
        console.log("Restart", { instance, guild })
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