import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"

import { RootState } from "../store"
import Layout from "../components/Layout/Layout"
import ModuleListForGuild from "../features/modules/ModuleListForGuild"
import { fetchGuilds } from "../features/guilds/guildsSlice"

function GuildPage() {
    const { id } = useParams<{ id: string }>()

    const dispatch = useDispatch()

    const guild = useSelector((store: RootState) => store.guilds.data[id])
    const status = useSelector((store: RootState) => store.guilds.status)
    const error = useSelector((store: RootState) => store.guilds.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGuilds())
        }
    }, [status, dispatch])

    let child = <CircularProgress/>

    if (status === "success") {
        child = <ModuleListForGuild guild={guild} />
    }
    
    if (status === "error") {
        child = <div>{ error }</div>
    }

    return (
        <Layout
            sidebarProps={{
                activeGuildId: guild?.id
            }}
        >
            { child }
        </Layout>
    )
}

export default GuildPage