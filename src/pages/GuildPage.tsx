import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { Tabs, Tab, Box, Grid, IconButton } from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"

import { RootState } from "../store"
import { API } from "../config/types"
import { RefHandle as StreamRefHandle, StreamProps } from "../features/streams/withStreamSubscription"
import { fetchGuilds } from "../features/guilds/guildsSlice"
import opener from "../components/ComponentOpener"

import Layout from "../components/Layout/Layout"
import Title from "../components/Styled/Title"
import GuildIcon from "../components/Discord/GuildIcon"
import ModuleListForGuild from "../features/modules/ModuleListForGuild"
import StatisticCard from "../components/Styled/StatisticCard"
import ChartCard from "../components/Styled/ChartCard"

import MemberCount, { MemberTrend } from "../features/streams/MemberCount"
import MemberTrendAtDay, { MemberTrendAtDayTrend } from "../features/streams/MemberTrendAtDay"
import MessagesAtDay, { MessagesAtDayTrend } from "../features/streams/MessagesAtDay"
import VoiceDurationAtDay, { VoiceDurationAtDayTrend } from "../features/streams/VoiceDurationAtDay"
import MemberChart from "../features/streams/MemberChart"
import MessageChart from "../features/streams/MessageChart"
import VoiceDurationChart from "../features/streams/VoiceDurationChart"

import GuildPageSkeleton from "./GuildPageSkeleton"

export type TabProps = {
    guild: API.Guild,
    getStreamRef: (refs: StreamRefHandle) => void,
    onClearStreamRefs: () => void
}

function Header({ guild }: { guild: API.Guild }) {
    const handleSettingsClick = () => {
        opener.openDialog("GuildSettingsDialog", { guild })
    }
    
    return (
        <Title>
            <Box display="flex" justifyContent="space-between">
                <Box display="flex">
                    <Box mr={2}>
                        <GuildIcon guild={guild} />
                    </Box>
                    {guild.name}
                </Box>


                <IconButton onClick={handleSettingsClick} size="small">
                    <SettingsIcon />
                </IconButton>
            </Box>
        </Title>
    )
}

function Overview({ guild, getStreamRef, onClearStreamRefs }: TabProps) {
    const streamProps: Record<string, any> & StreamProps = {
        guild,
        ref: getStreamRef,
        useAutomatedStreamPausing: false
    }

    onClearStreamRefs()

    return (
        <>
            <Header guild={guild}/>

            <Box
                display="flex"
                justifyContent="space-between"
                mb={3}
            >
                <StatisticCard
                    main={<MemberCount {...streamProps} />}
                    trend={<MemberTrend {...streamProps} />}
                    label="Member Count"
                />

                <StatisticCard
                    main={<MemberTrendAtDay {...streamProps} />}
                    trend={<MemberTrendAtDayTrend {...streamProps} />}
                    label="Member Trend Today"
                />

                <StatisticCard
                    main={<MessagesAtDay {...streamProps} />}
                    trend={<MessagesAtDayTrend {...streamProps} />}
                    label="Messages Today"
                />

                <StatisticCard
                    main={<VoiceDurationAtDay {...streamProps} />}
                    trend={<VoiceDurationAtDayTrend {...streamProps} />}
                    label="Voicechat Today"
                />
            </Box>

            <Box
                display="flex"
                justifyContent="space-between"
                mb={3}
            >
                <ChartCard
                    chart={<MemberChart {...streamProps} />}
                    label="Members"
                />

                <ChartCard
                    chart={<MessageChart {...streamProps} />}
                    label="Messages"
                />

                <ChartCard
                    chart={<VoiceDurationChart {...streamProps} />}
                    label="Voicechat"
                />
            </Box>

            <ModuleListForGuild {...streamProps} />
        </>
    )
}

function Statistics({ guild, getStreamRef, onClearStreamRefs }: TabProps) {
    const streamProps: Record<string, any> & StreamProps = {
        guild,
        ref: getStreamRef,
        useAutomatedStreamPausing: false
    }

    onClearStreamRefs()
    
    return (
        <>
            <Header guild={guild}/>

            <Box mb={3}>
                <ChartCard
                    chart={
                        <MemberChart
                            {...streamProps}
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
                                {...streamProps}
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
                                {...streamProps}
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

    const streamRefs = useRef<StreamRefHandle[]>([])
    
    const dispatch = useDispatch()

    const guild = useSelector((store: RootState) => store.guilds.data[guildId])
    const status = useSelector((store: RootState) => store.guilds.status)
    const error = useSelector((store: RootState) => store.guilds.error)

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        streamRefs.current = []
        setCurrentTab(newValue)
    }

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGuilds())
        }
    }, [status, dispatch])

    useEffect(() => {
        return () => {
            streamRefs.current.forEach(ref => {
                ref.pauseStream()
            })
        }
    }, [])

    let child = <GuildPageSkeleton/>

    if (status === "success") {
        if (!guild.isActive) {
            return <Redirect to="/not-found" />
        }

        child = React.createElement(tabs[currentTab], {
            guild,
            getStreamRef: (ref: StreamRefHandle) => {
                if (!ref) {
                    return
                }

                streamRefs.current.push(ref)
            },
            onClearStreamRefs: () => {
                streamRefs.current = []
            }
        })
    }
    
    if (status === "error") {
        child = <div>{error}</div>
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
            {child}
        </Layout>
    )
}

export default GuildPage
