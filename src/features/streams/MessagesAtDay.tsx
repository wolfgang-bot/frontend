import { useMemo } from "react"

import withStreamSubscription from "./withStreamSubscription"
import { getTimestampsBetween, roundToLastFullDay } from "./utils"

function MessagesAtDay({ data, timestamp = Date.now() }: {
    data: number[],
    timestamp?: number
}) {
    const messagesAtDay = useMemo(() => {
        const to = timestamp
        const from = roundToLastFullDay(to)
        const timestampObjects = data.map(timestamp => ({ timestamp }))
        return getTimestampsBetween(timestampObjects, from, to).length
    }, [data, timestamp])

    return <>{messagesAtDay}</>
}

export default withStreamSubscription(MessagesAtDay, "messages")