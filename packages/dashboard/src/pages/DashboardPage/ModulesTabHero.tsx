import React from "react"
import { Paper } from "@material-ui/core"

import { API } from "../../config/types"
import ModulesTabHeroModuleState from "./ModulesTabHeroModuleState"
import ModulesTabHeroInstanceState from "./ModulesTabHeroInstanceState"

export type HeroState = {
    type: "module" | "instance",
    guild: API.Guild,
    moduleKey: string,
    instance?: API.ModuleInstance
}

const contentMap: Record<
    HeroState["type"],
    React.FunctionComponent<{ state: HeroState, reset?: () => void }>
> = {
    "module": ModulesTabHeroModuleState,
    "instance": ModulesTabHeroInstanceState
}

function ModulesTabHero({ state, reset }: {
    state?: HeroState,
    reset: () => void
}) {
    if (!state || !state.moduleKey) {
        return null
    }

    return (
        <Paper variant="outlined">
            {React.createElement(contentMap[state.type], { state, reset })}
        </Paper>
    )
}

export default ModulesTabHero
