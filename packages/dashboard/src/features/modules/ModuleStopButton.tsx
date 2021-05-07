import { Button } from "@material-ui/core"

import api from "../../api"
import { API, INSTANCE_STATES } from "../../config/types"

function ModuleStopButton({ instance, module, guild }: {
    instance: API.ModuleInstance,
    module: API.Module,
    guild: API.Guild
}) {
    const handleClick = () => {
        api.ws.stopModuleInstance({
            guildId: guild.id,
            moduleKey: module.key
        })
    }

    return (
        <Button
            disabled={
                instance.state !== INSTANCE_STATES.ACTIVE
            }
            onClick={handleClick}
        >
            Stop
        </Button>
    )
}

export default ModuleStopButton
