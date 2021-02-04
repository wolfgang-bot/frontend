import React from "react"
import StartIcon from "@material-ui/icons/PlayArrow"

import { API } from "../../config/types"
import ActionButton from "./ActionButton"

type Props = {
    instance: API.ModuleInstance,
    guild: API.Guild,
    onUpdate: () => Promise<void>
} & Partial<React.ComponentProps<typeof ActionButton>>

function StartButton({ instance, guild, onUpdate, ...props }: Props) {
    const handleClick = async () => {
        console.log("Stop", { instance, guild })
    }

    return (
        <ActionButton
            icon={StartIcon}
            onClick={handleClick}
            {...props}
        />
    )
}

export default StartButton