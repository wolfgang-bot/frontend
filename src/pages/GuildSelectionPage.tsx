import React from "react"

import Layout from "../components/Layout/Layout"
import Title from "../components/Styled/Title"
import GuildList from "../features/guilds/GuildList"

function GuildSelectionPage() {
    return (
        <Layout>
            <Title>Guild Selection</Title>
            <GuildList/>
        </Layout>
    )
}
export default GuildSelectionPage
