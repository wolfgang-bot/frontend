import React from "react"
import StartIcon from "@material-ui/icons/PlayArrow"

import { API, INSTANCE_STATES } from "../../config/types"
import LoadingIconButton from "../../components/Styled/LoadingIconButton"
import opener from "../../components/ComponentOpener"

type Props = {
    module: API.Module,
    instance?: API.ModuleInstance,
    guild: API.Guild
} & Partial<React.ComponentProps<typeof LoadingIconButton>>

function StartButton({ module, instance, guild, ...props }: Props) {
    const handleClick = async () => {
        opener.openDialog("ModuleStartDialog", { module, guild })
    }

    return (
        <LoadingIconButton
            onClick={handleClick}
            isLoading={instance?.state === INSTANCE_STATES.STARTING}
            {...props}
        >
            <StartIcon/>
        </LoadingIconButton>
    )
}

export default StartButton