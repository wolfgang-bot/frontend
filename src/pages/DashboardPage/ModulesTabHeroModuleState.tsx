import { Avatar, Box, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import { HeroState } from "./ModulesTabHero"
import { API } from "../../config/types"

const useStyles = makeStyles((theme) => ({
    icon: {
        width: theme.spacing(4),
        height: theme.spacing(4)
    },
    
    bullet: {
        width: 20,
        height: 20,
        marginRight: theme.spacing(1)
    }
}))

function ModuleHeader({ module }: { module: API.Module }) {
    const classes = useStyles()

    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
        >
            <Grid item>
                <Avatar
                    src={module.icon}
                    className={classes.icon}
                />
            </Grid>

            <Grid item>
                <Typography>
                    {module.name}
                </Typography>
            </Grid>
        </Grid>
    )
}

function ModuleDescription({ module }: { module: API.Module }) {
    const classes = useStyles()

    return (
        <>
            {module.features.map((feature, index) => (
                <Box key={index} display="flex" mb={2}>
                    <ChevronRightIcon className={classes.bullet}/>
                    <Typography variant="body1">
                        {feature}
                    </Typography>
                </Box>
            ))}
        </>
    )
}

function ModulesTabHeroModuleState({ state }: { state: HeroState }) {
    return (
        <>
            <Box mb={4}>
                <ModuleHeader module={state.module}/>
            </Box>

            <Box overflow="auto" height={500} mb={4}>
                <ModuleDescription module={state.module}/>
            </Box>
        </>
    )
}

export default ModulesTabHeroModuleState
