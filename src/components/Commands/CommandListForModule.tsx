import { API } from "../../config/types"
import CommandGroups from "./CommandGroups"

function CommandListForModule({ module }: {
    module: API.Module
}) {
    return <CommandGroups groups={module.commandGroups} />
}

export default CommandListForModule
