import React from "react"
import StartIcon from "@material-ui/icons/PlayArrow"

import { API } from "../../config/types"
import ActionButton from "./ActionButton"
import opener from "../../components/ComponentOpener"
import api from "../../api"

type Props = {
    module: API.Module,
    guild: API.Guild,
    onUpdate: () => Promise<void>
} & Partial<React.ComponentProps<typeof ActionButton>>

function StartButton({ module, guild, onUpdate, ...props }: Props) {
    const handleClick = async () => {
        const handle = opener.openDialog("StartModuleDialog", { module, guild })
        handle.addEventListener("close", (values) => {
            api.ws.startModuleInstance(guild.id, module.name, values.args)
        })
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