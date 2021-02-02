import React from "react"
import { useParams } from "react-router-dom"

import Layout from "../components/Layout/Layout.js"
import ModuleInstanceListForGuild from "../features/moduleInstances/ModuleInstaceListForGuild.js"

function GuildPage() {
    const { id } = useParams()

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