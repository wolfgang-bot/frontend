import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../../components/Layout/Layout"
import Title from "../../components/Styled/Title"
import StatisticCard from "../../components/Styled/StatisticCard"
import ChartCard from "../../components/Styled/ChartCard"

import GuildCount, { GuildTrend } from "../../features/streams/GuildCount"
import UserCount, { UserTrend } from "../../features/streams/UserCount"
import ModuleInstanceCount, { ModuleInstanceTrend } from "../../features/streams/ModuleInstanceCount"
import { GuildChart, UserChart, ModuleInstanceChart } from "../../features/streams/charts"
import AdminList from "../../features/users/AdminList"
import AdminForm from "../../components/Forms/AdminForm"
import GuildList from "../../features/guilds/GlobalGuildList"

const LIST_HEIGHT = 400
const ADMIN_FORM_HEIGHT = 64

const useStyles = makeStyles({
    guildList: {
        height: LIST_HEIGHT,
        overflow: "auto"
    },

    adminList: {
        height: LIST_HEIGHT - ADMIN_FORM_HEIGHT,
        overflow: "auto"
    }
})

function AdminPage() {
    const classes = useStyles()

    return (
        <Layout>
            <Title>Admin</Title>

            <Grid
                container
                direction="column"
                spacing={4}
            >
                <Grid
                    item
                    container
                    justify="space-between"
                    spacing={4}
                >
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

                <Grid
                    item
                    container
                    justify="space-between"
                    spacing={4}
                >
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

                <Grid item container spacing={4}>
                    <Grid item xs>
                        <Paper variant="outlined">
                            <Box px={3} py={2}>
                                <Typography variant="body1">Guilds</Typography>
                            </Box>

                            <Divider/>

                            <Box px={1}>
                                <GuildList className={classes.guildList}/>
                            </Box>
                        </Paper>
                    </Grid>

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
                                <AdminList className={classes.adminList}/>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default AdminPage
