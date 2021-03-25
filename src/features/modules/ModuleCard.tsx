import React from "react"
import { useHistory } from "react-router-dom"
import { Card, CardHeader, CardActionArea, CardActions, Typography, Box, IconButton } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import { makeStyles } from "@material-ui/core/styles"
import ConfigIcon from "@material-ui/icons/Settings"

import { API, INSTANCE_STATES } from "../../config/types"
import StartButton from "./StartButton"
import StopButton from "./StopButton"
import RestartButton from "./RestartButton"
import opener from "../../components/ComponentOpener"

const useStyles = makeStyles({
    icon: {
        borderRadius: "50%",
        width: 32,
        height: 32
    },

    configButton: {
        color: "rgba(255, 255, 255, .67)"
    }
})

type Props = {
    module: API.Module,
    instance?: API.ModuleInstance,
    guild?: API.Guild
}

function ModuleCard({ module, instance, guild }: Props) {
    const history = useHistory()

    const classes = useStyles()

    const handleClick = () => {
        if (guild) {
            history.push(`/dashboard/${guild.id}/module/${module.key}`)
        } else {
            history.push(`/module/${module.key}`)
        }
    }

    const openConfigDialog = () => {
        opener.openDialog("InstanceConfigDialog", { instance, guild })
    }

    const commonButtonProps = { module, instance, guild: guild! }

    const canStartInstance = !instance
    const canStopInstance = instance?.state === INSTANCE_STATES.ACTIVE

    return (
        <Card variant="outlined">
            <CardActionArea onClick={handleClick}>
                <CardHeader
                    disableTypography
                    avatar={
                        <img
                            src={module.icon}
                            className={classes.icon}
                            alt="Icon"
                        />
                    }
                    title={
                        <Typography variant="body1">
                            {module.name}
                        </Typography>
                    }
                />
            </CardActionArea>

            {guild && (
                <CardActions>
                    <StartButton
                        {...commonButtonProps}
                        disabled={!canStartInstance}
                        size="small"
                        color="primary"
                    />
                    <StopButton
                        {...commonButtonProps}
                        disabled={!canStopInstance}
                        size="small"
                        color="secondary"
                    />
                    <RestartButton
                        {...commonButtonProps}
                        disabled={!canStopInstance}
                        size="small"
                        color="secondary"
                    />
                    <IconButton
                        size="small"
                        disabled={canStartInstance}
                        onClick={openConfigDialog}
                        className={classes.configButton}
                    >
                        <ConfigIcon/>
                    </IconButton>
                </CardActions>
            )}
        </Card>
    )
}

export function ModuleCardSkeleton({ seed, guild }: { seed: number, guild?: boolean }) {
    return (
        <Card>
            <CardActionArea>
                <CardHeader
                    disableTypography
                    avatar={<Skeleton variant="circle" width={40} height={40} />}
                    title={
                        <Typography variant="body1">
                            <Skeleton
                                width={130 + seed * 50}
                            />
                        </Typography>
                    }
                />
            </CardActionArea>

            {guild && (
                <CardActions>
                    {Array(4).fill(0).map((_, i) => (
                        <Box m={0.5} key={i}>
                            <Skeleton variant="circle" width={24} height={24} />
                        </Box>
                    ))}
                </CardActions>
            )}
        </Card>
    )
}

export default ModuleCard
