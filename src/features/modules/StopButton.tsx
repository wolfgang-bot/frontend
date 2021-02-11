import React from "react"
import StopIcon from "@material-ui/icons/Stop"

import { API, INSTANCE_STATES } from "../../config/types"
import LoadingIconButton from "../../components/Styled/LoadingIconButton"
import api from "../../api"

type Props = {
    module: API.Module,
    instance?: API.ModuleInstance,
    guild: API.Guild
} & Partial<React.ComponentProps<typeof LoadingIconButton>>

function StartButton({ module, instance, guild, ...props }: Props) {
    const handleClick = async () => {
        api.ws.stopModuleInstance(guild.id, module.key)
    }

    return (
        <LoadingIconButton
            onClick={handleClick}
            isLoading={instance?.state === INSTANCE_STATES.STOPPING}
            {...props}
        >
            <StopIcon/>
        </LoadingIconButton>
    )
}

export default StartButton