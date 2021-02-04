import React from "react"
import { Card, CardActionArea, CardContent, CardActions, Typography } from "@material-ui/core"

import { API } from "../../config/types"
import StartButton from "./StartButton"
import StopButton from "./StopButton"
import RestartButton from "./RestartButton"

type Props = {
    instance: API.ModuleInstance,
    guild: API.Guild,
    active: boolean,
    onUpdate: () => Promise<void>
}

function ModuleCard({ instance, guild, active, onUpdate }: Props) {
    const commonButtonProps = { instance, guild, onUpdate }

    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography>
                        {instance.moduleName}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <StartButton
                    {...commonButtonProps}
                    disabled={active}
                    size="small"
                />
                <StopButton
                    {...commonButtonProps}
                    disabled={!active}
                    size="small"
                />
                <RestartButton
                    {...commonButtonProps}
                    disabled={!active}
                    size="small"
                />
            </CardActions>
        </Card>
    )
}

export default ModuleCard