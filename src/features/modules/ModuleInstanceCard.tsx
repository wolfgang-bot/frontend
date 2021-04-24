import React from "react"
import { Card, CardHeader, CardActionArea, Typography, CircularProgress } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import { makeStyles } from "@material-ui/core/styles"

import { API, INSTANCE_STATES } from "../../config/types"

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

function ModuleInstanceCard({ instance, module }: {
    instance: API.ModuleInstance,
    module: API.Module
}) {
    if (instance.moduleKey !== module.key) {
        throw new Error("Instance and module do not match")
    }

    const classes = useStyles()

    const isLoading =
        instance?.state === INSTANCE_STATES.STARTING ||
        instance?.state === INSTANCE_STATES.STOPPING

    return (
        <Card variant="outlined">
            <CardActionArea>
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

                {isLoading && <CircularProgress/>}
            </CardActionArea>
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
