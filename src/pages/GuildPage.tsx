import React from "react"
import { useParams } from "react-router-dom"

import Layout from "../components/Layout/Layout"
import ModuleInstanceListForGuild from "../features/moduleInstances/ModuleInstaceListForGuild"

function GuildPage() {
    const { id } = useParams<{ id: string }>()

    return (
        <Layout
            sidebarProps={{
                activeGuild: id
            }}
        >
            <ModuleInstanceListForGuild guildId={id}/>
        </Layout>
    )
}

export default GuildPage