import React from "react"
import { Grid } from "@material-ui/core"

import Header from "./Header"
import { TabProps } from "./TabsRouter"
import UserMessageLeaderboard from "../../features/streams/UserMessageLeaderboard"
import { SubscriptionOptions } from "../../features/streams/withStreamSubscription"

function StatisticsTab({ guild, getStreamRef, onClearStreamRefs }: TabProps) {
    const streamProps: Record<string, any> & SubscriptionOptions = {
        guild,
        ref: getStreamRef,
        useAutomatedStreamPausing: false
    }

    onClearStreamRefs()

    return (
        <>
            <Header guild={guild} />

            <Grid container spacing={4}>
                <Grid item xs>
                    <UserMessageLeaderboard {...streamProps}/>
                </Grid>

                <Grid item xs/>
            </Grid>
        </>
    )
}

export default StatisticsTab
