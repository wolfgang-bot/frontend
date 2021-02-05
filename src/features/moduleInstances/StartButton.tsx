import React from "react"
import StartIcon from "@material-ui/icons/PlayArrow"

import { API } from "../../config/types"
import ActionButton from "./ActionButton"

type Props = {
    module: API.Module,
    guild: API.Guild,
    onUpdate: () => Promise<void>
} & Partial<React.ComponentProps<typeof ActionButton>>

function StartButton({ module, guild, onUpdate, ...props }: Props) {
    const handleClick = async () => {
        console.log("Start", { module, guild })
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