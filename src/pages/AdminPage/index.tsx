import React from "react"
import { Box } from "@material-ui/core"

import Layout from "../../components/Layout/Layout"
import Title from "../../components/Styled/Title"
import ChartCard from "../../components/Styled/ChartCard"

import GuildChart from "../../features/streams/GuildChart"

function AdminPage() {
    return (
        <Layout>
            <Title>Admin</Title>

            <Box
                display="flex"
                justifyContent="space-between"
                mb={3}
            >
                <ChartCard
                    chart={<GuildChart />}
                    label="Guilds"
                />
            </Box>
        </Layout>
    )
}

export default AdminPage
