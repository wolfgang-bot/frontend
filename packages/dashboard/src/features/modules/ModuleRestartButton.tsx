import { Button } from "@material-ui/core"

import api from "../../api"
import { API, INSTANCE_STATES } from "../../config/types"

function ModuleRestartButton({ instance, module, guild }: {
    instance: API.ModuleInstance,
    module: API.Module,
    guild: API.Guild
}) {
    const handleClick = () => {
        api.ws.restartModuleInstance({
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
            Restart
        </Button>
    )
}

export default ModuleRestartButton
