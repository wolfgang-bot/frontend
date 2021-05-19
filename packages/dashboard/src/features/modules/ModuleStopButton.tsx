import { Button } from "@material-ui/core"

import api from "../../api"
import { API, INSTANCE_STATES } from "../../config/types"

function ModuleStopButton({ instance }: {
    instance: API.ModuleInstance
}) {
    const handleClick = () => {
        api.ws.stopModuleInstance({
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
            Stop
        </Button>
    )
}

export default ModuleStopButton
