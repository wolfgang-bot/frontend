import { useMemo } from "react"

import { API } from "../../config/types"
import withStreamSubscription from "./withStreamSubscription"
import { getTimestampsBetween, millisecondsToHours, roundToLastFullDay, roundToPlaces } from "./utils"

function VoiceDurationAtDay({ data, timestamp = Date.now() }: {
    data: API.Event<API.VoiceEventMeta>[],
    timestamp: number
}) {
    const voiceDurationAtDay = useMemo(() => {
        const to = timestamp
        const from = roundToLastFullDay(to)
        const eventsAtDay = getTimestampsBetween(data, from, to)
        return eventsAtDay.reduce(
            (duration, event) => duration + event.meta.duration,
            0
        )
    }, [data, timestamp])

    const durationInHours = millisecondsToHours(voiceDurationAtDay)

    return <>{roundToPlaces(durationInHours, 2)}h</>
}

export default withStreamSubscription(VoiceDurationAtDay, "voice")