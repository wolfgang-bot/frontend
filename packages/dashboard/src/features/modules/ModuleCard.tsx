import React from "react"
import clsx from "clsx"
import { Card, CardHeader, CardActionArea, Typography, Box } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import { makeStyles } from "@material-ui/core/styles"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import { API } from "../../config/types"

const useStyles = makeStyles({
    disabled: {
        opacity: .5
    },

    icon: {
        borderRadius: "50%",
        width: 32,
        height: 32
    }
})

type Props = React.ComponentProps<typeof CardActionArea> & {
    module: API.Module,
    onMouseEnter: React.ComponentProps<typeof Card>["onMouseEnter"]
}

function ModuleCard({ module, onMouseEnter, ...props }: Props) {
    const classes = useStyles()

    const disabled = module.remainingInstances === 0
    const usedInstances = module.maxInstances - module.remainingInstances

    return (
        <Card
            variant="outlined"
            onMouseEnter={onMouseEnter}
            className={clsx({
                [classes.disabled]: disabled
            })}
        >
            <CardActionArea disabled={disabled} {...props}>
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

                            <Box display="flex">
                                <Box pr={.5}>
                                    <Typography>
                                        {usedInstances} / {module.maxInstances}
                                    </Typography>
                                </Box>
                                <ChevronRightIcon/>
                            </Box>
                        </Box>
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
