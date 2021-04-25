import { useState } from "react"
import {
    Card,
    CardHeader,
    CardActionArea,
    Typography,
    CircularProgress,
    Box,
    Collapse,
    Grid
} from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import { makeStyles } from "@material-ui/core/styles"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import { API, INSTANCE_STATES } from "../../config/types"
import clsx from "clsx"
import ModuleStopButton from "./ModuleStopButton"
import ModuleRestartButton from "./ModuleRestartButton"

const useStyles = makeStyles(theme => ({
    icon: {
        borderRadius: "50%",
        width: 32,
        height: 32
    },

    expandIcon: {
        transform: "rotate(90deg)",
        transition: theme.transitions.create("transform")
    },

    expandIconRotated: {
        transform: "rotate(-90deg)"
    }
}))

function ModuleInstanceCard({ instance, module, guild }: {
    instance: API.ModuleInstance,
    module: API.Module,
    guild: API.Guild
}) {
    if (instance.moduleKey !== module.key) {
        throw new Error("Instance and module do not match")
    }

    const classes = useStyles()
    
    const [isExpanded, setIsExpanded] = useState(false)

    const isLoading =
        instance?.state === INSTANCE_STATES.STARTING ||
        instance?.state === INSTANCE_STATES.STOPPING
    
    return (
        <Card variant="outlined">
            <CardActionArea onClick={() => setIsExpanded(!isExpanded)}>
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
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="body1">
                                {module.name}
                            </Typography>

                            <Box display="flex" alignItems="center">
                                {isLoading && (
                                    <Box mr={2}>
                                        <CircularProgress size={24}/>
                                    </Box>
                                )}
                                <ChevronRightIcon
                                    className={clsx(
                                        classes.expandIcon,
                                        { [classes.expandIconRotated]: isExpanded }
                                    )}
                                />
                            </Box>
                        </Box>
                    }
                />
            </CardActionArea>

            <Collapse in={isExpanded}>
                <Box p={1}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ModuleRestartButton
                                module={module}
                                instance={instance}
                                guild={guild}
                            />
                        </Grid>
                        <Grid item>
                            <ModuleStopButton
                                module={module}
                                instance={instance}
                                guild={guild}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>
        </Card>
    )
}

export function ModuleInstanceCardSkeleton() {
    return (
        <Card>
            <CardHeader
                disableTypography
                avatar={<Skeleton variant="circle" width={40} height={40} />}
                title={
                    <Typography variant="body1">
                        <Skeleton/>
                    </Typography>
                }
            />
        </Card>
    )
}

export default ModuleInstanceCard
