import React from "react"

import Layout from "../components/Layout/Layout"
import Title from "../components/Styled/Title"
import UserGuildList from "../features/guilds/UserGuildList"

function GuildSelectionPage() {
    return (
        <Layout>
            <Title>Guild Selection</Title>
            <UserGuildList/>
        </Layout>
    )
}
export default GuildSelectionPage
