import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Box } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

import { RootState } from "../../store"
import Guild from "./Guild"
import { fetchGuilds } from "./guildsSlice"

function GuildList({ activeGuildId }: { activeGuildId?: string }) {
    const dispatch = useDispatch()

    const guilds = useSelector((store: RootState) => store.guilds.data)
    const status = useSelector((store: RootState) => store.guilds.status)
    const error = useSelector((store: RootState) => store.guilds.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGuilds())
        }
    }, [status, dispatch])

    if (status === "success") {
        return (
            <>
                {Object.values(guilds).map(guild => (
                    <Guild
                        key={guild.id}
                        guild={guild}
                        active={activeGuildId ? activeGuildId === guild.id : false}
                    />
                ))}
            </>
        )
    }

    if (status === "error") {
        return <div>{ error }</div>
    }

    return (
        <>
            {Array(3).fill(null).map((_, index) => (
                <Box mb={1} key={index}>
                    <Skeleton variant="rect" height={56}/>
                </Box>
            ))}
        </>
    )
}

export default GuildList