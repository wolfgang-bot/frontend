import React from "react"
import { Card, CardHeader, CardActionArea, Typography } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import { makeStyles } from "@material-ui/core/styles"

import { API } from "../../config/types"

const useStyles = makeStyles({
    icon: {
        borderRadius: "50%",
        width: 32,
        height: 32
    }
})

function ModuleCard({ module }: { module: API.Module }) {
    const classes = useStyles()

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
            </CardActionArea>
        </Card>
    )
}

export function ModuleCardSkeleton() {
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

export default ModuleCard
