import React, { useEffect, useRef } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import { Tabs, Tab, Box } from "@material-ui/core"

import { API } from "../../config/types"
import { RefHandle as StreamRefHandle } from "../../features/streams/withStreamSubscription"
import Layout from "../../components/Layout/Layout"
import OverviewTab from "./OverviewTab"
import ModulesTab from "./ModulesTab"
import CommunityTab from "./CommunityTab"

export type TabProps = {
    guild: API.Guild,
    getStreamRef: (refs: StreamRefHandle) => void,
    onClearStreamRefs: () => void
}

const tabs = [
    {
        label: "Overview",
        path: "overview",
        component: OverviewTab
    },
    {
        label: "Modules",
        path: "modules",
        component: ModulesTab
    },
    {
        label: "Community",
        path: "community",
        component: CommunityTab,
    }
]

function getTabFromPath(path: string) {
    return tabs.find(tab => tab.path === path)
}

function TabsRouter({ guild }: { guild: API.Guild }) {
    const history = useHistory()
    
    const { path, url } = useRouteMatch()
    const match = useRouteMatch<{ tab: string }>(`${path}/:tab`)

    const currentTab = getTabFromPath(match?.params.tab || "") || tabs[0]

    const streamRefs = useRef<Record<string, StreamRefHandle[]>>({})

    const collectStreamRefs = () => {
        return Object.values(streamRefs.current).flat()
    }

    const handleTabChange = (_event: React.ChangeEvent<{}>, newPath: string) => {
        history.push(`${url}/${newPath}`)
    }

    useEffect(() => {
        return () => {
            collectStreamRefs().forEach(ref => {
                ref.pauseStream()
            })
        }
    }, [])

    streamRefs.current[currentTab.label] = []

    return (
        <Layout
            navbar={
                <Tabs value={currentTab.path} onChange={handleTabChange}>
                    {tabs.map((tab, i) => (
                        <Tab
                            label={tab.label}
                            value={tab.path}
                            key={i}
                        />
                    ))}
                </Tabs>
            }
        >
            <Box mt={4}>
                {React.createElement(currentTab.component, {
                    guild,
                    getStreamRef: (ref: StreamRefHandle) => {
                        if (!ref) {
                            return
                        }

                        streamRefs.current[currentTab.label].push(ref)
                    },
                    onClearStreamRefs: () => {
                        streamRefs.current[currentTab.label] = []
                    }
                })}
            </Box>
        </Layout>
    )
}

export default TabsRouter
