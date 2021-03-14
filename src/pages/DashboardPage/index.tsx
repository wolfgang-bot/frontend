import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { Tabs } from "@material-ui/core"

import { RootState } from "../../store"
import { fetchGuilds } from "../../features/guilds/guildsSlice"
import DashboardPageSkeleton from "./DashboardPageSkeleton"
import TabsRouter from "./TabsRouter"
import Layout from "../../components/Layout/Layout"

function DashboardPage() {
    const { guildId } = useParams<{ guildId: string }>()
    
    const dispatch = useDispatch()

    const guild = useSelector((store: RootState) => store.guilds.data[guildId])
    const status = useSelector((store: RootState) => store.guilds.status)
    const error = useSelector((store: RootState) => store.guilds.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGuilds())
        }
    }, [status, dispatch])

    if (status === "success") {
        if (!guild.isActive) {
            return <Redirect to="/not-found" />
        }

        return <TabsRouter guild={guild}/>
    }
    
    if (status === "error") {
        return (
            <Layout navbar={<Tabs/>}>
                <div>{error}</div>
            </Layout>
        )
    }

    return (
        <Layout navbar={<Tabs/>}>
            <DashboardPageSkeleton />
        </Layout>
    )
}

export default DashboardPage
