import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { Tabs, Tab } from "@material-ui/core"

import { RootState } from "../../store"
import { API } from "../../config/types"
import { RefHandle as StreamRefHandle } from "../../features/streams/withStreamSubscription"
import { fetchGuilds } from "../../features/guilds/guildsSlice"
import Layout from "../../components/Layout/Layout"
import DashboardPageSkeleton from "./DashboardPageSkeleton"
import OverviewTab from "./OverviewTab"
import StatisticsTab from "./StatisticsTab"

export type TabProps = {
    guild: API.Guild,
    getStreamRef: (refs: StreamRefHandle) => void,
    onClearStreamRefs: () => void
}

const tabs = [OverviewTab, StatisticsTab]

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

    let child = <DashboardPageSkeleton/>

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
