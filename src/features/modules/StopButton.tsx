import React from "react"
import StopIcon from "@material-ui/icons/Stop"

import { API } from "../../config/types"
import ActionButton from "./ActionButton"

type Props = {
    module: API.Module,
    guild: API.Guild,
    onUpdate: () => Promise<void>
} & Partial<React.ComponentProps<typeof ActionButton>>

function StartButton({ module, guild, onUpdate, ...props }: Props) {
    const handleClick = async () => {
        console.log("Stop", { module, guild })
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