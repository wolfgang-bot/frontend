import React, { useState } from "react"
import { Box, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core"

import { API } from "../../config/types"
import GuildIcon from "../../components/Discord/GuildIcon"

function GuildCard({ guild }: { guild: API.Guild }) {
    const [isMouseOver, setIsMouseOver] = useState(false)

    return (
        <ListItem
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <Box mr={2}>
                <GuildIcon
                    guild={guild}
                    animated={isMouseOver}
                />
            </Box>

            <ListItemText
                primary={guild.name}
                secondary={guild.id}
            />

            <ListItemSecondaryAction>
                <Box display="flex" alignItems="center">
                    <Typography>{guild.memberCount.data}</Typography>
                </Box>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default GuildCard
