import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { Tabs, Tab, Box, Grid } from "@material-ui/core"

import { RootState } from "../store"
import { API } from "../config/types"
import { fetchGuilds } from "../features/guilds/guildsSlice"
import Layout from "../components/Layout/Layout"
import Title from "../components/Styled/Title"
import GuildIcon from "../components/Discord/GuildIcon"
import StatisticCard from "../components/Styled/StatisticCard"
import ChartCard from "../components/Styled/ChartCard"
import ModuleListForGuild from "../features/modules/ModuleListForGuild"
import MemberCount from "../features/streams/MemberCount"
import MemberVolumeAtDay from "../features/streams/MemberVolumeAtDay"
import MessagesAtDay from "../features/streams/MessagesAtDay"
import VoiceDurationAtDay from "../features/streams/VoiceDurationAtDay"
import LocaleSelect from "../features/locales/LocaleSelect"
import MemberChart from "../features/streams/MemberChart"
import MessageChart from "../features/streams/MessageChart"
import VoiceDurationChart from "../features/streams/VoiceDurationChart"
import * as Skeletons from "../components/Skeletons"

function Header({ guild }: { guild: API.Guild }) {
    return (
        <Title>
            <Box display="flex" justifyContent="space-between">
                <Box display="flex">
                    <Box mr={2}>
                        <GuildIcon guild={guild} />
                    </Box>
                    {guild.name}
                </Box>


                <LocaleSelect guild={guild} />
            </Box>
        </Title>
    )
}

function Overview({ guild }: { guild: API.Guild }) {
    return (
        <>
            <Header guild={guild}/>

            <Box
                display="flex"
                justifyContent="space-between"
                mb={3}
            >
                <StatisticCard
                    main={<MemberCount guild={guild} />}
                    secondary="Member Count"
                />

                <StatisticCard
                    main={<MemberVolumeAtDay guild={guild} />}
                    secondary="Member Volume Today"
                />

                <StatisticCard
                    main={<MessagesAtDay guild={guild} />}
                    secondary="Messages Today"
                />

                <StatisticCard
                    main={<VoiceDurationAtDay guild={guild} />}
                    secondary="Voicechat Today"
                />
            </Box>

            <Box
                display="flex"
                justifyContent="space-between"
                mb={3}
            >
                <ChartCard
                    chart={<MemberChart guild={guild} />}
                    label="Members"
                />

                <ChartCard
                    chart={<MessageChart guild={guild} />}
                    label="Messages"
                />

                <ChartCard
                    chart={<VoiceDurationChart guild={guild} />}
                    label="Voicechat"
                />
            </Box>

            <ModuleListForGuild guild={guild} />
        </>
    )
}

function Statistics({ guild }: { guild: API.Guild }) {
    return (
        <>
            <Header guild={guild}/>

            <Box mb={3}>
                <ChartCard
                    chart={
                        <MemberChart
                            guild={guild}
                            width={null}
                            height={400}
                        />
                    }
                    width="100%"
                    label="Members"
                />
            </Box>

            <Grid container justify="space-between" spacing={3}>
                <Grid item xs>
                    <ChartCard
                        chart={
                            <MessageChart
                                guild={guild}
                                width={null}
                                height={400}
                            />
                        }
                        width="100%"
                        label="Messages"
                    />
                </Grid>

                <Grid item xs>
                    <ChartCard
                        chart={
                            <VoiceDurationChart
                                guild={guild}
                                width={null}
                                height={400}
                            />
                        }
                        width="100%"
                        label="Voicechat"
                    />
                </Grid>
            </Grid>
        </>
    )
}

const tabs = [Overview, Statistics]

function GuildPage() {
    const { guildId } = useParams<{ guildId: string }>()

    const [currentTab, setCurrentTab] = useState(0)

    const dispatch = useDispatch()

    const guild = useSelector((store: RootState) => store.guilds.data[guildId])
    const status = useSelector((store: RootState) => store.guilds.status)
    const error = useSelector((store: RootState) => store.guilds.error)

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue)
    }

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGuilds())
        }
    }, [status, dispatch])

    let child = <Skeletons.ModuleListForGuild/>

    if (status === "success") {
        if (!guild.isActive) {
            return <Redirect to="/not-found" />
        }

        child = React.createElement(tabs[currentTab], {
            guild
        })
    }
    
    if (status === "error") {
        child = <div>{ error }</div>
    }

    return (
        <Layout
            navbar={
                <Tabs value={currentTab} onChange={handleTabChange}>
                    <Tab label="Overview" />
                    <Tab label="Statistics" />
                </Tabs>
            }
        >

            { child }
        </Layout>
    )
}

export default GuildPage