import React from "react"
import { Grid } from "@material-ui/core"

import { TabProps } from "./TabsRouter"

import { SubscriptionOptions } from "../../features/streams/withStreamSubscription"
import ChartCard from "../../components/Styled/ChartCard"
import { MemberChart, MessageChart, VoiceDurationChart } from "../../features/streams/charts"

function StatisticsTab({ guild, getStreamRef, onClearStreamRefs }: TabProps) {
    const streamProps: Record<string, any> & SubscriptionOptions = {
        guild,
        ref: getStreamRef,
        useAutomatedStreamPausing: false
    }

    onClearStreamRefs()

    return (
        <Grid container direction="column" spacing={4}>
            <Grid item>
                <ChartCard
                    chart={
                        <MemberChart
                            {...streamProps}
                            width={null}
                            height={400}
                        />
                    }
                    label="Members"
                />
            </Grid>

            <Grid item container justify="space-between" spacing={4}>
                <Grid item xs>
                    <ChartCard
                        chart={
                            <MessageChart
                                {...streamProps}
                                width={null}
                                height={400}
                            />
                        }
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
                        label="Voicechat"
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StatisticsTab
