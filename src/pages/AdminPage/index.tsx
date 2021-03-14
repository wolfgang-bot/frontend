import React from "react"
import { Grid } from "@material-ui/core"

import Layout from "../../components/Layout/Layout"
import Title from "../../components/Styled/Title"
import ChartCard from "../../components/Styled/ChartCard"

import GuildChart from "../../features/streams/GuildChart"
import UserChart from "../../features/streams/UserChart"

function AdminPage() {
    return (
        <Layout>
            <Title>Admin</Title>

            <Grid container justify="space-between" spacing={4}>
                <Grid item xs>
                    <ChartCard
                        chart={<GuildChart />}
                        label="Guilds"
                        width="100%"
                    />
                </Grid>

                <Grid item xs>
                    <ChartCard
                        chart={<UserChart />}
                        label="Users"
                        width="100%"
                    />
                </Grid>
            </Grid>
        </Layout>
    )
}

export default AdminPage
