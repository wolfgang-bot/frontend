import React from "react"
import { Card, CardHeader, CardActionArea, CardActions, Avatar, Typography } from "@material-ui/core"

import { API, INSTANCE_STATES } from "../../config/types"
import StartButton from "./StartButton"
import StopButton from "./StopButton"
import RestartButton from "./RestartButton"

type Props = {
    module: API.Module,
    instance?: API.ModuleInstance,
    guild: API.Guild
}

function ModuleCard({ module, instance, guild }: Props) {
    const commonButtonProps = { module, instance, guild }

    const isActive = instance?.state === INSTANCE_STATES.ACTIVE

    return (
        <Card>
            <CardActionArea>
                <CardHeader
                    disableTypography
                    avatar={<Avatar src={module.icon}/>}
                    title={<Typography variant="body1">{module.key}</Typography>}
                />
            </CardActionArea>

            <CardActions>
                <StartButton
                    {...commonButtonProps}
                    disabled={isActive}
                    size="small"
                />
                <StopButton
                    {...commonButtonProps}
                    disabled={!isActive}
                    size="small"
                />
                <RestartButton
                    {...commonButtonProps}
                    disabled={!isActive}
                    size="small"
                />
            </CardActions>
        </Card>
    )
}

export default ModuleCard