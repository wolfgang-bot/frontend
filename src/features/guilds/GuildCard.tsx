import React from "react"
import { useHistory } from "react-router-dom"
import { Card, CardActionArea, CardHeader, Typography } from "@material-ui/core"

import { API } from "../../config/types"
import GuildIcon from "../../components/Discord/GuildIcon"

function GuildCard({ guild, className }: {
    guild: API.Guild,
    className?: string
}) {
    const history = useHistory()

    const handleClick = () => {
        history.push(`/dashboard/${guild.id}`)
    }

    return (
        <Card variant="outlined" className={className}>
            <CardActionArea onClick={handleClick}>
                <CardHeader
                    disableTypography
                    avatar={
                        <GuildIcon guild={guild} />
                    }
                    title={
                        <Typography variant="body1">
                            {guild.name}
                        </Typography>
                    }
                />
            </CardActionArea>
        </Card>
    )
}

export default GuildCard