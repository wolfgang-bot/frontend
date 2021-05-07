import React from "react"
import { Redirect, useParams } from "react-router-dom"
import { Tabs } from "@material-ui/core"

import DashboardPageSkeleton from "./DashboardPageSkeleton"
import TabsRouter from "./TabsRouter"
import Layout from "../../components/Layout/Layout"
import { API, GUILD_STATUS } from "../../config/types"
import withStreamSubscription from "../../features/streams/withStreamSubscription"

function DashboardPage({ data, isLoading }: {
    data: API.Guild[],
    isLoading: boolean
}) {
    const { guildId } = useParams<{ guildId: string }>()

    const guild = data && data.find(guild => guild.id === guildId)

    if (!isLoading) {
        if (!guild || guild.status !== GUILD_STATUS.ACTIVE) {
            return <Redirect to="/not-found" />
        }

        return <TabsRouter guild={guild}/>
    }

    return (
        <Layout navbar={<Tabs/>}>
            <DashboardPageSkeleton />
        </Layout>
    )
}

export default withStreamSubscription(DashboardPage, "user-guilds", {
    showOverlayIfEmpty: false,
    renderProgressWhileLoading: false,
    useAutomatedStreamPausing: false
})
