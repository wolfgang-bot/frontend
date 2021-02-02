import React from "react"
import { Avatar } from "@material-ui/core"

import { API } from "../../config/types"

function GuildIcon({ guild, animated }: {
    guild: API.Guild,
    animated: boolean
}) {
    return guild.icon ? (
        <Avatar src={!animated ? guild.icon : guild.icon_animated}/>
    ) : (
        <Avatar>{guild.name.substr(0, 1)}</Avatar>
    )
}

export default GuildIcon