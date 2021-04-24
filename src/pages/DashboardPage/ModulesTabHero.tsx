import React from "react"
import { Box, Paper } from "@material-ui/core"

import { API } from "../../config/types"
import ModulesTabHeroModuleState from "./ModulesTabHeroModuleState"
import ModulesTabHeroInstanceState from "./ModulesTabHeroInstanceState"

export type HeroState = {
    type: "module" | "instance",
    guild: API.Guild,
    module: API.Module,
    instance?: API.ModuleInstance
}

const contentMap: Record<
    HeroState["type"],
    React.FunctionComponent<{ state: HeroState }>
> = {
    "module": ModulesTabHeroModuleState,
    "instance": ModulesTabHeroInstanceState
}

function ModulesTabHero({ state }: { state?: HeroState }) {
    if (!state) {
        return <></>
    }

    return (
        <Paper variant="outlined">
            <Box m={2}>
                {React.createElement(contentMap[state.type], { state })}
            </Box>
        </Paper>
    )
}

export default ModulesTabHero
