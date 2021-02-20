import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Card, CardActionArea, CardHeader, Typography } from "@material-ui/core"

import { API } from "../../config/types"
import GuildIcon from "../../components/Discord/GuildIcon"
import { DISCORD_BOT_INVITE_URL } from "../../config/constants"

function GuildCard({ guild, className }: {
    guild: API.Guild,
    className?: string
}) {
    const history = useHistory()

    const [isMouseOver, setIsMouseOver] = useState(false)

    const handleClick = () => {
        if (!guild.isActive) {
            window.open(
                `${DISCORD_BOT_INVITE_URL}&guild_id=${guild.id}`,
                "_blank",
                "noopener,noreferrer"
            )
        } else {
            history.push("/dashboard/" + guild.id)
        }
    }

    return (
        <Card
            variant="outlined"
            className={className}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <CardActionArea onClick={handleClick}>
                <CardHeader
                    disableTypography
                    avatar={
                        <GuildIcon
                            guild={guild}
                            animated={isMouseOver}
                        />
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