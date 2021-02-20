import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RootState } from "../store"
import { fetchGuilds } from "../features/guilds/guildsSlice"
import Layout from "../components/Layout/Layout"
import GuildCard from "../features/guilds/GuildCard"
import Title from "../components/Styled/Title"

const useStyles = makeStyles(theme => ({
    guildCard: {
        marginTop: theme.spacing(2)
    }
}))

function DashboardPage() {
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

    let child = <CircularProgress/>

    if (status === "success") {
        child = (
            <>
                <Title>Guild Selection</Title>

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
        child = (
            <div>{error}</div>
        )
    }

    return (
        <Layout>
            {child}
        </Layout>
    )
}
export default DashboardPage