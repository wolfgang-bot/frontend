import { useMemo } from "react"

import withStreamSubscription from "./withStreamSubscription"
import { getTimestampsBetween, roundToLastFullDay, MILLISECONDS_PER_DAY, TimestampObject } from "./utils"
import Trend from "../../components/Styled/Trend"

function convertTimestampsToObjects(timestamps: number[]) {
    return timestamps.map(timestamp => ({ timestamp }) as TimestampObject)
}

function MessagesAtDay({ data, timestamp = Date.now() }: {
    data: number[],
    timestamp?: number
}) {
    const messagesAtDay = useMemo(() => {
        const timestampObjects = convertTimestampsToObjects(data)

        const to = timestamp
        const from = roundToLastFullDay(to)

        return getTimestampsBetween(timestampObjects, from, to).length
    }, [data, timestamp])

    return <>{messagesAtDay}</>
}

function _MessagesAtDayTrend({ data, timestamp = Date.now() }: {
    data: number[],
    timestamp: number
}) {
    const trend = useMemo(() => {
        if (data.length === 0) {
            return 0
        }

        const timestampObjects = convertTimestampsToObjects(data)

        const to = roundToLastFullDay(timestamp)
        const from = to - MILLISECONDS_PER_DAY

        const messagesAtDay = getTimestampsBetween(timestampObjects, to, timestamp).length
        const messagesAtOneDayAgo = getTimestampsBetween(timestampObjects, from, to).length

        return (messagesAtDay - messagesAtOneDayAgo) / messagesAtOneDayAgo
    }, [data, timestamp])

    return <Trend value={trend}/>
}

export default withStreamSubscription(MessagesAtDay, "messages")

export const MessagesAtDayTrend = withStreamSubscription(_MessagesAtDayTrend, "messages", {
    showOverlayIfEmpty: false
})