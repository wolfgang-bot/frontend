import { Avatar, Box, Divider, Grid, Typography, useMediaQuery } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import { HeroState } from "./ModulesTabHero"
import { API } from "../../config/types"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import Codeblock from "../../components/Styled/Codeblock"

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

export function ModuleHeader({ module }: { module: API.Module }) {
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
            <Box mb={4}>
                {module.features.map((feature, index) => (
                    <Box key={index} display="flex" mb={2}>
                        <ChevronRightIcon className={classes.bullet}/>
                        <Typography variant="body1">
                            {feature}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box>
                {module.commands.map((command, index) => (
                    <Box key={index} mb={2}>
                        <Box mb={0.5}>
                            <Typography>{command.description}</Typography>
                        </Box>
                        <Codeblock>{command.usage}</Codeblock>
                    </Box>
                ))}
            </Box>
        </>
    )
}

function ModulesTabHeroModuleState({ state }: { state: HeroState }) {
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))

    const module = useSelector((store: RootState) => store.modules.guilds[state.guild.id]?.data?.[state.moduleKey])
    const status = useSelector((store: RootState) => store.modules.guilds[state.guild.id]?.status)

    if (status !== "success") {
        return <></>
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
                <ModuleDescription module={module}/>
            </Box>
        </>
    )
}

export default ModulesTabHeroModuleState
