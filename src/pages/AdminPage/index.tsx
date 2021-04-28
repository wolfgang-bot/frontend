import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core"

import Layout from "../../components/Layout/Layout"
import Title from "../../components/Styled/Title"
import StatisticCard from "../../components/Styled/StatisticCard"
import ChartCard from "../../components/Styled/ChartCard"

import GuildCount, { GuildTrend } from "../../features/streams/GuildCount"
import UserCount, { UserTrend } from "../../features/streams/UserCount"
import ModuleInstanceCount, { ModuleInstanceTrend } from "../../features/streams/ModuleInstanceCount"
import { GuildChart, UserChart, ModuleInstanceChart } from "../../features/streams/charts"
import AdminList from "./AdminList"
import AdminForm from "./AdminForm"

function AdminPage() {
    return (
        <Layout>
            <Title>Admin</Title>

            <Box mb={4}>
                <Grid container direction="column" spacing={4}>
                    <Grid item container justify="space-between" spacing={4}>
                        <Grid item xs>
                            <StatisticCard
                                main={<GuildCount />}
                                trend={<GuildTrend />}
                                label="Guild Count"
                            />
                        </Grid>

                        <Grid item xs>
                            <StatisticCard
                                main={<UserCount />}
                                trend={<UserTrend />}
                                label="Users Count"
                            />
                        </Grid>

                        <Grid item xs>
                            <StatisticCard
                                main={<ModuleInstanceCount />}
                                trend={<ModuleInstanceTrend />}
                                label="Active Module-Instances"
                            />
                        </Grid>
                    </Grid>

                    <Grid item container justify="space-between" spacing={4}>
                        <Grid item xs>
                            <ChartCard
                                chart={<GuildChart />}
                                label="Guilds"
                            />
                        </Grid>

                        <Grid item xs>
                            <ChartCard
                                chart={<UserChart />}
                                label="Users"
                            />
                        </Grid>

                        <Grid item xs>
                            <ChartCard
                                chart={<ModuleInstanceChart />}
                                label="Module Instances"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs>
                    <Paper variant="outlined">
                        <Box px={3} py={2}>
                            <Typography variant="body1">Admins</Typography>
                        </Box>

                        <Divider/>

                        <Box px={3} py={1}>
                            <AdminForm/>
                        </Box>

                        <Box px={1}>
                            <AdminList/>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs/>
            </Grid>
        </Layout>
    )
}

export default AdminPage
