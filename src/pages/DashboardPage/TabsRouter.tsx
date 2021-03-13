import React, { useEffect, useState, useRef } from "react"
import { Tabs, Tab } from "@material-ui/core"

import { API } from "../../config/types"
import { RefHandle as StreamRefHandle } from "../../features/streams/withStreamSubscription"
import Layout from "../../components/Layout/Layout"
import OverviewTab from "./OverviewTab"
import StatisticsTab from "./StatisticsTab"

export type TabProps = {
    guild: API.Guild,
    getStreamRef: (refs: StreamRefHandle) => void,
    onClearStreamRefs: () => void
}

const tabs = [
    { label: "Overview", component: OverviewTab },
    { label: "Statistics", component: StatisticsTab }
]

function TabsRouter({ guild }: { guild: API.Guild }) {
    const [currentTab, setCurrentTab] = useState(0)

    const streamRefs = useRef<StreamRefHandle[]>([])

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue)
        streamRefs.current = []
    }

    useEffect(() => {
        return () => {
            streamRefs.current.forEach(ref => {
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
            {React.createElement(tabs[currentTab].component, {
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
            })}
        </Layout>
    )
}

export default TabsRouter
