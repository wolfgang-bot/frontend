import { Box, Divider, Grid } from "@material-ui/core"
import { useSelector } from "react-redux"
import api from "../../api"

import ArgumentsForm from "../../components/Forms/ArgumentsForm/ArgumentsForm"
import LoadingButton from "../../components/Styled/LoadingButton"
import { API, INSTANCE_STATES } from "../../config/types"
import { RootState } from "../../store"
import { mergeStatus } from "../../utils"
import { HeroState } from "./ModulesTabHero"
import { ModuleHeader } from "./ModulesTabHeroModuleState"

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
        <LoadingButton
            isLoading={
                instance.state === INSTANCE_STATES.STOPPING
            }
            onClick={handleClick}
        >
            Stop
        </LoadingButton>
    )
}

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

            <Box overflow="auto" height={500-69} p={2}>
                <ArgumentsForm
                    args={module.args}
                    guild={state.guild}
                    currentConfig={instance.config}
                    disabled
                />
            </Box>

            <Divider/>

            <Box p={2}>
                <Grid
                    container
                    spacing={2}
                    justify="flex-end"
                >
                    <Grid item>
                        <ModuleStopButton
                            instance={instance}
                            module={module}
                            guild={state.guild}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default ModulesTabHeroInstanceState
