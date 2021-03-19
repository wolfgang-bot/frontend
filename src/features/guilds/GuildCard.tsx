import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Box, Card, CardActionArea, CardHeader, Typography } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import InactiveIcon from "@material-ui/icons/Close"
import ActiveIcon from "@material-ui/icons/Check"

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
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
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

                    <Box mr={2}>
                        {
                            !guild.isActive ?
                            <InactiveIcon/> :
                            <ActiveIcon/>
                        }
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}

export function GuildCardSkeleton(
    props: React.ComponentProps<typeof Skeleton>
) {
    return (
        <Skeleton
            variant="rect"
            height={64}
            {...props}
        />
    )
}

export default GuildCard
