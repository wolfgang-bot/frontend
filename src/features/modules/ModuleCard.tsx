import React from "react"
import { Card, CardActionArea, CardContent, CardActions, Typography } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

import { API, INSTANCE_STATES } from "../../config/types"
import StartButton from "./StartButton"
import StopButton from "./StopButton"
import RestartButton from "./RestartButton"

type Props = {
    module?: API.Module,
    instance?: API.ModuleInstance,
    guild?: API.Guild,
    isLoading?: boolean
}

function ButtonWrapper({ isLoading = false, children }: {
    isLoading?: boolean,
    children: React.ReactChild
}) {
    if (isLoading) {
        return <Skeleton variant="circle" width={24} height={24}/>
    }

    return children as any
}

function ModuleCard({ module, instance, guild, isLoading }: Props) {
    if (!isLoading) {
        if (!module || !guild) {
            throw new Error("Missing props")
        }
    }

    const props = {
        module: module!,
        instance: instance!,
        guild: guild!
    }

    const isActive = instance?.state === INSTANCE_STATES.ACTIVE

    return (
        <Card>
            <CardActionArea>
                <CardContent>
                        <Typography>
                            {isLoading ? <Skeleton width={100} /> : props.module.key}
                        </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <ButtonWrapper isLoading={isLoading}>
                    <StartButton
                        {...props}
                        disabled={isActive}
                        size="small"
                    />
                </ButtonWrapper>

                <ButtonWrapper isLoading={isLoading}>
                    <StopButton
                        {...props}
                        disabled={!isActive}
                        size="small"
                    />
                </ButtonWrapper>

                <ButtonWrapper isLoading={isLoading}>
                    <RestartButton
                        {...props}
                        disabled={!isActive}
                        size="small"
                    />
                </ButtonWrapper>
            </CardActions>
        </Card>
    )
}

export default ModuleCard