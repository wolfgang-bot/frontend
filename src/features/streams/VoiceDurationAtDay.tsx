import { useMemo } from "react"

import { API } from "../../config/types"
import withStreamSubscription from "./withStreamSubscription"
import { getTimestampsBetween, millisecondsToHours, MILLISECONDS_PER_DAY, roundToLastFullDay, roundToPlaces } from "./utils"
import Trend from "../../components/Styled/Trend"

function getTotalVoiceDurationFromEvents(events: API.Event<API.VoiceEventMeta>[]) {
    return events.reduce(
        (duration, event) => duration + event.meta.duration,
        0
    )
}

function VoiceDurationAtDay({ data, timestamp = Date.now() }: {
    data: API.Event<API.VoiceEventMeta>[],
    timestamp: number
}) {
    const voiceDurationAtDay = useMemo(() => {
        const to = timestamp
        const from = roundToLastFullDay(to)
        const eventsAtDay = getTimestampsBetween(data, from, to)
        return getTotalVoiceDurationFromEvents(eventsAtDay)
    }, [data, timestamp])

    const durationInHours = millisecondsToHours(voiceDurationAtDay)

    return <>{roundToPlaces(durationInHours, 2)}h</>
}

function _VoiceDurationAtDayTrend({ data, timestamp = Date.now() }: {
    data: API.Event<API.VoiceEventMeta>[],
    timestamp: number
}) {
    const trend = useMemo(() => {
        if (data.length === 0) {
            return 0
        }

        const to = roundToLastFullDay(timestamp)
        const from = to - MILLISECONDS_PER_DAY

        const eventsAtDay = getTimestampsBetween(data, to, timestamp)
        const eventsAtOneDayAgo = getTimestampsBetween(data, from, to)

        const voiceDurationAtDay = getTotalVoiceDurationFromEvents(eventsAtDay)
        const voiceDurationOneDayAgo = getTotalVoiceDurationFromEvents(eventsAtOneDayAgo)

        return (voiceDurationAtDay - voiceDurationOneDayAgo) / voiceDurationOneDayAgo
    }, [data, timestamp])

    return <Trend value={trend}/>
}

export default withStreamSubscription(VoiceDurationAtDay, "voice")

export const VoiceDurationAtDayTrend = withStreamSubscription(_VoiceDurationAtDayTrend, "voice", {
    showOverlayIfEmpty: false
})