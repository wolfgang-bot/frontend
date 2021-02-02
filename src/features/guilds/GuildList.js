import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CircularProgress } from "@material-ui/core"

import Guild from "./Guild.js"
import { fetchGuilds } from "./guildsSlice.js"

function GuildList({ activeGuild }) {
    const dispatch = useDispatch()

    const guilds = useSelector(store => store.guilds.data)
    const status = useSelector(store => store.guilds.status)
    const error = useSelector(store => store.guilds.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGuilds())
        }
    }, [status, dispatch])

    if (status === "pending") {
        return <CircularProgress/>
    }

    if (status === "error") {
        return <div>{ error }</div>
    }

    return Object.values(guilds).map(guild => (
        <Guild guild={guild} key={guild.id} active={activeGuild && activeGuild === guild.id}/>
    ))
}

export default GuildList