import React from "react"

import Layout from "../components/Layout/Layout"
import Title from "../components/Styled/Title"
import GuildList from "../features/guilds/GuildList"

function DashboardPage() {
    return (
        <Layout>
            <Title>Guild Selection</Title>
            <GuildList/>
        </Layout>
    )
}
export default DashboardPage