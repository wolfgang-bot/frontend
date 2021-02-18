import React from "react"
import { useHistory } from "react-router-dom"
import { Card, CardHeader, CardActionArea, CardActions, Avatar, Typography } from "@material-ui/core"

import { API, INSTANCE_STATES } from "../../config/types"
import StartButton from "./StartButton"
import StopButton from "./StopButton"
import RestartButton from "./RestartButton"

type Props = {
    module: API.Module,
    instance?: API.ModuleInstance,
    guild?: API.Guild
}

function ModuleCard({ module, instance, guild }: Props) {
    const history = useHistory()

    const handleClick = () => {
        if (guild) {
            history.push(`/dashboard/${guild.id}/module/${module.key}`)
        } else {
            history.push(`/module/${module.key}`)
        }
    }

    const commonButtonProps = { module, instance, guild: guild! }

    const isActive = instance?.state === INSTANCE_STATES.ACTIVE

    return (
        <Card>
            <CardActionArea onClick={handleClick}>
                <CardHeader
                    disableTypography
                    avatar={<Avatar src={module.icon}/>}
                    title={<Typography variant="body1">{module.translations.name}</Typography>}
                />
            </CardActionArea>

            {guild && (
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
            )}
        </Card>
    )
}

export default ModuleCard