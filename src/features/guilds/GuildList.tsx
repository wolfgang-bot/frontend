import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CircularProgress } from "@material-ui/core"

import { RootState } from "../../store"
import Guild from "./Guild"
import { fetchGuilds } from "./guildsSlice"

function GuildList({ activeGuildId }: { activeGuildId: string }) {
    const dispatch = useDispatch()

    const guilds = useSelector((store: RootState) => store.guilds.data)
    const status = useSelector((store: RootState) => store.guilds.status)
    const error = useSelector((store: RootState) => store.guilds.error)

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
        <Guild guild={guild} key={guild.id} active={activeGuildId && activeGuildId === guild.id}/>
    ))
}

export default GuildList