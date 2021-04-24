import { Box, Button, Divider, Grid } from "@material-ui/core"
import api from "../../api"

import ArgumentsForm from "../../components/Forms/ArgumentsForm/ArgumentsForm"
import { API } from "../../config/types"
import { HeroState } from "./ModulesTabHero"
import { ModuleHeader } from "./ModulesTabHeroModuleState"

function ModuleStopButton({ module, guild }: {
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
        <Button onClick={handleClick}>
            Stop
        </Button>
    )
}

function ModulesTabHeroInstanceState({ state }: { state: HeroState }) {
    if (!state.instance) {
        throw new Error("Missing prop: 'state.instance'")
    }

    return (
        <>
            <Box p={2}>
                <ModuleHeader module={state.module}/>
            </Box>

            <Divider/>

            <Box overflow="auto" height={500-69} p={2}>
                <ArgumentsForm
                    args={state.module.args}
                    guild={state.guild}
                    currentConfig={state.instance.config}
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
                            instance={state.instance}
                            module={state.module}
                            guild={state.guild}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default ModulesTabHeroInstanceState
