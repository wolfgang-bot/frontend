import { Button } from "@material-ui/core"

import api from "../../api"
import { API, INSTANCE_STATES } from "../../config/types"

function ModuleRestartButton({ instance }: {
    instance: API.ModuleInstance
}) {
    const handleClick = () => {
        api.ws.restartModuleInstance({
            instanceId: instance.id
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
