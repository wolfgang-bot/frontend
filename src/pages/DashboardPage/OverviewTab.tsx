import React from "react"
import { Box } from "@material-ui/core"

import Header from "./Header"
import { TabProps } from "./TabsRouter"

import { SubscriptionOptions } from "../../features/streams/withStreamSubscription"
import ModuleListForGuild from "../../features/modules/ModuleListForGuild"
import StatisticCard from "../../components/Styled/StatisticCard"
import ChartCard from "../../components/Styled/ChartCard"

import MemberCount, { MemberTrend } from "../../features/streams/MemberCount"
import MemberTrendAtDay, { MemberTrendAtDayTrend } from "../../features/streams/MemberTrendAtDay"
import MessagesAtDay, { MessagesAtDayTrend } from "../../features/streams/MessagesAtDay"
import VoiceDurationAtDay, { VoiceDurationAtDayTrend } from "../../features/streams/VoiceDurationAtDay"
import MemberChart from "../../features/streams/MemberChart"
import MessageChart from "../../features/streams/MessageChart"
import VoiceDurationChart from "../../features/streams/VoiceDurationChart"

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

            <Box
                display="flex"
                justifyContent="space-between"
                mb={3}
            >
                <StatisticCard
                    main={<MemberCount {...streamProps} />}
                    trend={<MemberTrend {...streamProps} />}
                    label="Member Count"
                    width={256}
                />

                <StatisticCard
                    main={<MemberTrendAtDay {...streamProps} />}
                    trend={<MemberTrendAtDayTrend {...streamProps} />}
                    label="Member Trend Today"
                    width={256}
                />

                <StatisticCard
                    main={<MessagesAtDay {...streamProps} />}
                    trend={<MessagesAtDayTrend {...streamProps} />}
                    label="Messages Today"
                    width={256}
                />

                <StatisticCard
                    main={<VoiceDurationAtDay {...streamProps} />}
                    trend={<VoiceDurationAtDayTrend {...streamProps} />}
                    label="Voicechat Today"
                    width={256}
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
                    width={370}
                />

                <ChartCard
                    chart={<MessageChart {...streamProps} />}
                    label="Messages"
                    width={370}
                />

                <ChartCard
                    chart={<VoiceDurationChart {...streamProps} />}
                    label="Voicechat"
                    width={370}
                />
            </Box>

            <ModuleListForGuild {...streamProps} />
        </>
    )
}

export default OverviewTab
