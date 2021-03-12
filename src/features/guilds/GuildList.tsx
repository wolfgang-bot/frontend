import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

import { RootState } from "../../store"
import { fetchGuilds } from "../guilds/guildsSlice"
import GuildCard, { GuildCardSkeleton } from "../guilds/GuildCard"

const useStyles = makeStyles(theme => ({
    guildCard: {
        marginTop: theme.spacing(2)
    }
}))

function GuildList() {
    const classes = useStyles()

    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.guilds.status)
    const data = useSelector((store: RootState) => store.guilds.data)
    const error = useSelector((store: RootState) => store.guilds.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGuilds())
        }
    }, [status, dispatch])

    if (status === "success") {
        return (
            <>
                {Object.values(data).map(guild => (
                    <GuildCard
                        key={guild.id}
                        guild={guild}
                        className={classes.guildCard}
                    />
                ))}
            </>
        )
    }

    if (status === "error") {
        return (
            <div>{error}</div>
        )
    }

    return (
        <>
            {Array(3).fill(3).map((_, i) => (
                <Box mt={2} key={i}>
                    <GuildCardSkeleton
                        className={classes.guildCard}
                    />
                </Box>
            ))}
        </>
    )
}

export default GuildList
