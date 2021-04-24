import React, { useEffect, useState, useRef } from "react"
import { Tabs, Tab, Box } from "@material-ui/core"

import { API } from "../../config/types"
import { RefHandle as StreamRefHandle } from "../../features/streams/withStreamSubscription"
import Layout from "../../components/Layout/Layout"
import OverviewTab from "./OverviewTab"
import StatisticsTab from "./StatisticsTab"
import CommunityTab from "./CommunityTab"

export type TabProps = {
    guild: API.Guild,
    getStreamRef: (refs: StreamRefHandle) => void,
    onClearStreamRefs: () => void
}

const tabs = [
    { label: "Overview", component: OverviewTab },
    { label: "Statistics", component: StatisticsTab },
    { label: "Community", component: CommunityTab }
]

function TabsRouter({ guild }: { guild: API.Guild }) {
    const [currentTab, setCurrentTab] = useState(0)
    const currentLabel = tabs[currentTab].label

    const streamRefs = useRef<Record<string, StreamRefHandle[]>>({})

    const collectStreamRefs = () => {
        return Object.values(streamRefs.current).flat()
    }

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue)
        const tabLabel = tabs[newValue].label
        streamRefs.current[tabLabel] = []
    }

    useEffect(() => {
        return () => {
            collectStreamRefs().forEach(ref => {
                ref.pauseStream()
            })
        }
    }, [])

    return (
        <Layout
            navbar={
                <Tabs value={currentTab} onChange={handleTabChange}>
                    {tabs.map((tab, i) => (
                        <Tab label={tab.label} key={i}/>
                    ))}
                </Tabs>
            }
        >
            <Box mt={4}>
                {React.createElement(tabs[currentTab].component, {
                    guild,
                    getStreamRef: (ref: StreamRefHandle) => {
                        if (!ref) {
                            return
                        }

                        streamRefs.current[currentLabel].push(ref)
                    },
                    onClearStreamRefs: () => {
                        streamRefs.current[currentLabel] = []
                    }
                })}
            </Box>
        </Layout>
    )
}

export default TabsRouter
