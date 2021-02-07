import React from "react"
import RestartIcon from "@material-ui/icons/Replay"

import { API } from "../../config/types"
import LoadingIconButton from "../../components/Styled/LoadingIconButton"
import api from "../../api"

type Props = {
    module: API.Module,
    instance?: API.ModuleInstance,
    guild: API.Guild
} & Partial<React.ComponentProps<typeof LoadingIconButton>>

function RestartButton({ module, instance, guild, ...props }: Props) {
    const handleClick = async () => {
        api.ws.restartModuleInstance(guild.id, module.name)
    }

    return (
        <LoadingIconButton
            onClick={handleClick}
            isLoading={false}
            {...props}
        >
            <RestartIcon/>
        </LoadingIconButton>
    )
}

export default RestartButton