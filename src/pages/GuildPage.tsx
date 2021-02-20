import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { Tabs, Tab, Box } from "@material-ui/core"

import { RootState } from "../store"
import { fetchGuilds } from "../features/guilds/guildsSlice"
import Layout from "../components/Layout/Layout"
import Title from "../components/Styled/Title"
import GuildIcon from "../components/Discord/GuildIcon"
import StatisticCard from "../components/Styled/StatisticCard"
import ChartCard from "../components/Styled/ChartCard"
import ModuleListForGuild from "../features/modules/ModuleListForGuild"
import MemberCount from "../features/guilds/MemberCount"
import LocaleSelect from "../features/locales/LocaleSelect"
import MemberChart from "../components/Charts/MemberChart"
import MessageChart from "../components/Charts/MessageChart"
import VoiceDurationChart from "../components/Charts/VoiceDurationChart"
import * as Skeletons from "../components/Skeletons"

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

        child = (
            <>
                <Title>
                    <Box display="flex" justifyContent="space-between">
                        <Box display="flex">
                            <Box mr={2}>
                                <GuildIcon guild={guild}/>
                            </Box>
                            {guild.name}
                        </Box>


                        <LocaleSelect guild={guild}/>
                    </Box>
                </Title>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    mb={3}
                >
                    <StatisticCard
                        main={<MemberCount guild={guild}/>}
                        secondary="Member Count"
                    />
                </Box>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    mb={3}
                >
                    <ChartCard
                        chart={<MemberChart guild={guild}/>}
                        label="Members"
                    />

                    <ChartCard
                        chart={<MessageChart guild={guild}/>}
                        label="Messages"
                    />

                    <ChartCard
                        chart={<VoiceDurationChart guild={guild}/>}
                        label="Voicechat"
                    />
                </Box>

                <ModuleListForGuild guild={guild}/>
            </>
        )
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
                    <Tab label="Modules" />
                </Tabs>
            }
        >

            { child }
        </Layout>
    )
}

export default GuildPage