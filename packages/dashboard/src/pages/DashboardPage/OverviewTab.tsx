import React from "react"
import { Grid } from "@material-ui/core"

import Header from "./Header"
import { TabProps } from "./TabsRouter"

import { SubscriptionOptions } from "../../features/streams/withStreamSubscription"
import StatisticCard from "../../components/Styled/StatisticCard"
import ChartCard from "../../components/Styled/ChartCard"

import MemberCount, { MemberTrend } from "../../features/streams/MemberCount"
import MemberTrendAtDay, { MemberTrendAtDayTrend } from "../../features/streams/MemberTrendAtDay"
import MessagesAtDay, { MessagesAtDayTrend } from "../../features/streams/MessagesAtDay"
import VoiceDurationAtDay, { VoiceDurationAtDayTrend } from "../../features/streams/VoiceDurationAtDay"
import { MemberChart, MessageChart, VoiceDurationChart } from "../../features/streams/charts"

function OverviewTab({ guild, getStreamRef, onClearStreamRefs }: TabProps) {
    const streamProps: Record<string, any> & SubscriptionOptions = {
        guild,
        ref: getStreamRef,
        useAutomatedStreamPausing: false
    }

    onClearStreamRefs()

    return (
        <>
            <Header guild={guild} />

            <Grid container direction="column" spacing={4}>
                <Grid item container justify="space-between" spacing={4}>
                    <Grid item xs={12} sm={6} lg>
                        <StatisticCard
                            main={<MemberCount {...streamProps} />}
                            trend={<MemberTrend {...streamProps} />}
                            label="Member Count"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} lg>
                        <StatisticCard
                            main={<MemberTrendAtDay {...streamProps} />}
                            trend={<MemberTrendAtDayTrend {...streamProps} />}
                            label="Member Trend Today"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} lg>
                        <StatisticCard
                            main={<MessagesAtDay {...streamProps} />}
                            trend={<MessagesAtDayTrend {...streamProps} />}
                            label="Messages Today"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} lg>
                        <StatisticCard
                            main={<VoiceDurationAtDay {...streamProps} />}
                            trend={<VoiceDurationAtDayTrend {...streamProps} />}
                            label="Voicechat Today"
                        />
                    </Grid>
                </Grid>

                <Grid item container justify="space-between" spacing={4}>
                    <Grid item xs={12} lg>
                        <ChartCard
                            chart={<MemberChart {...streamProps} />}
                            label="Members"
                        />
                    </Grid>

                    <Grid item xs={12} lg>
                        <ChartCard
                            chart={<MessageChart {...streamProps} />}
                            label="Messages"
                        />
                    </Grid>

                    <Grid item xs={12} lg>
                        <ChartCard
                            chart={<VoiceDurationChart {...streamProps} />}
                            label="Voicechat"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default OverviewTab
