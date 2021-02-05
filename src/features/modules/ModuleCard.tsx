import React from "react"
import { Card, CardActionArea, CardContent, CardActions, Typography } from "@material-ui/core"

import { API } from "../../config/types"
import StartButton from "./StartButton"
import StopButton from "./StopButton"
import RestartButton from "./RestartButton"

type Props = {
    module: API.Module,
    guild: API.Guild,
    active: boolean,
    onUpdate: () => Promise<void>
}

function ModuleCard({ module, guild, active, onUpdate }: Props) {
    const commonButtonProps = { module, guild, onUpdate }

    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography>
                        {module.name}
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