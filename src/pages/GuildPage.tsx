import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"

import { RootState } from "../store"
import Layout from "../components/Layout/Layout"
import ModuleInstanceListForGuild from "../features/moduleInstances/ModuleInstaceListForGuild"
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
    }, [status])

    let child = <CircularProgress/>

    if (status === "error") {
        child = <div>{ error }</div>
    } else if (status === "success") {
        child = <ModuleInstanceListForGuild guild={guild}/>
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