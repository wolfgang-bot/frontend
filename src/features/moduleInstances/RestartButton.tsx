import React from "react"
import RestartIcon from "@material-ui/icons/Replay"

import { API } from "../../config/types"
import ActionButton from "./ActionButton"

type Props = {
    module: API.Module,
    guild: API.Guild,
    onUpdate: () => Promise<void>
} & Partial<React.ComponentProps<typeof ActionButton>>

function RestartButton({ module, guild, onUpdate, ...props }: Props) {
    const handleClick = async () => {
        console.log("Restart", { module, guild })
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