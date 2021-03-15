import React from "react"
import { Box, Grid } from "@material-ui/core"

import Header from "./Header"
import { TabProps } from "./TabsRouter"

import { StreamProps } from "../../features/streams/withStreamSubscription"
import ChartCard from "../../components/Styled/ChartCard"

import MemberChart from "../../features/streams/MemberChart"
import MessageChart from "../../features/streams/MessageChart"
import VoiceDurationChart from "../../features/streams/VoiceDurationChart"

function StatisticsTab({ guild, getStreamRef, onClearStreamRefs }: TabProps) {
    const streamProps: Record<string, any> & StreamProps = {
        guild,
        ref: getStreamRef,
        useAutomatedStreamPausing: false
    }

    onClearStreamRefs()

    return (
        <>
            <Header guild={guild} />

            <Box mb={3}>
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
        </>
    )
}

export default StatisticsTab
