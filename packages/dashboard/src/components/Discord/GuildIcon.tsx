import React from "react"
import { Avatar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { API } from "../../config/types"

const useStyles = makeStyles({
    guildIcon: {
        borderRadius: "50%",
        width: 32,
        height: 32
    }
})

function GuildIcon({ guild, animated = true }: {
    guild: API.Guild,
    animated?: boolean
}) {
    const classes = useStyles()
    
    const commonProps = {
        className: classes.guildIcon
    }

    return guild.icon ? (
        <Avatar
            src={!animated ? guild.icon : guild.icon_animated}
            {...commonProps}
        />
    ) : (
        <Avatar
            {...commonProps}
        >
            {guild.name.substr(0, 1)}
        </Avatar>
    )
}

export default GuildIcon