import { Box, Divider } from "@material-ui/core"
import { useSelector } from "react-redux"

import ArgumentsForm from "../../components/Forms/ArgumentsForm/ArgumentsForm"
import { RootState } from "../../store"
import { mergeStatus } from "../../utils"
import { HeroState } from "./ModulesTabHero"
import { ModuleHeader } from "./ModulesTabHeroModuleState"

function ModulesTabHeroInstanceState({ state, reset = () => {} }: {
    state: HeroState,
    reset?: () => void
}) {
    if (!state.instanceModuleKey) {
        throw new Error("Missing prop: 'state.instance'")
    }

    const instance = useSelector((store: RootState) => 
        store.moduleInstances.guilds[state.guild.id]?.data?.[state.instanceModuleKey!]
    )
    const instanceStatus = useSelector((store: RootState) =>
        store.moduleInstances.guilds[state.guild.id]?.status
    )

    const module = useSelector((store: RootState) => store.modules.data?.[state.moduleKey])
    const moduleStatus = useSelector((store: RootState) => store.modules.status)

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

            <Box overflow="auto" height={600-64} p={2}>
                <ArgumentsForm
                    key={module.key}
                    args={module.args}
                    guild={state.guild}
                    currentConfig={instance.config}
                    disabled
                />
            </Box>
        </>
    )
}

export default ModulesTabHeroInstanceState
