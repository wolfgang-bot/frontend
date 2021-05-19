import { Box, Divider, Theme, useMediaQuery } from "@material-ui/core"
import { useSelector } from "react-redux"

import ArgumentsForm from "../../components/Forms/ArgumentsForm/ArgumentsForm"
import { API } from "../../config/types"
import { RootState } from "../../store"
import { mergeStatus } from "../../utils"
import { HeroState } from "./ModulesTabHero"
import { ModuleHeader } from "./ModulesTabHeroModuleState"

function filterArgs(args: API.Module["args"]) {
    return args.filter(arg => arg.key !== "label")
}

function ModulesTabHeroInstanceState({ state, reset = () => {} }: {
    state: HeroState,
    reset?: () => void
}) {
    if (!state.instance) {
        throw new Error("Missing prop: 'state.instance'")
    }

    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))

    const instance = useSelector((store: RootState) => 
        store.moduleInstances.guilds[state.guild.id]?.data?.[state.instance!.id]
    )
    const instanceStatus = useSelector((store: RootState) =>
        store.moduleInstances.guilds[state.guild.id]?.status
    )

    const module = useSelector((store: RootState) => store.modules.guilds[state.guild.id]?.data?.[state.moduleKey])
    const moduleStatus = useSelector((store: RootState) => store.modules.guilds[state.guild.id]?.status)

    const status = mergeStatus(instanceStatus, moduleStatus)

    if (status !== "success") {
        return null
    }

    if (!instance) {
        requestAnimationFrame(reset)
        return null
    }

    return (
        <>
            <Box p={2}>
                <ModuleHeader module={module}/>
            </Box>

            <Divider/>

            <Box
                overflow="auto"
                height={!isSmallScreen ? 600-64 : undefined}
                p={2}
            >
                <ArgumentsForm
                    key={module.key}
                    args={filterArgs(module.args)}
                    guild={state.guild}
                    currentConfig={instance.config}
                    disabled
                />
            </Box>
        </>
    )
}

export default ModulesTabHeroInstanceState
