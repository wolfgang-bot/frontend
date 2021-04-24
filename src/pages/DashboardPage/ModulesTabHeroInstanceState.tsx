import { Box, Divider } from "@material-ui/core"
import ArgumentsForm from "../../components/Forms/ArgumentsForm/ArgumentsForm"
import { HeroState } from "./ModulesTabHero"
import { ModuleHeader } from "./ModulesTabHeroModuleState"

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

            <Box overflow="auto" height={500} p={2}>
                <ArgumentsForm
                    args={state.module.args}
                    guild={state.guild}
                    currentConfig={state.instance.config}
                    disabled
                />
            </Box>
        </>
    )
}

export default ModulesTabHeroInstanceState
