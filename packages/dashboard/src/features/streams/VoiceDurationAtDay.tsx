import React from "react"

import { API } from "../../config/types"
import withStreamSubscription from "./withStreamSubscription"
import { getTrendFromSVDataset, isSVDataObject, millisecondsToHours, roundToPlaces } from "./utils"
import Trend from "../../components/Styled/Trend"

function VoiceDurationAtDay({ data }: {
    data: API.SVDataset
}) {
    const lastDataObject = data[data.length - 1]

    if (!isSVDataObject(lastDataObject)) {
        return <>0</>
    }

    const durationInHours = millisecondsToHours(lastDataObject.value)

    return <>{roundToPlaces(durationInHours, 2)}h</>
}

function _VoiceDurationAtDayTrend({ data }: {
    data: API.SVDataset
}) {
    return <Trend value={getTrendFromSVDataset(data)}/>
}

export default withStreamSubscription(VoiceDurationAtDay, "voice")

export const VoiceDurationAtDayTrend = withStreamSubscription(_VoiceDurationAtDayTrend, "voice", {
    showOverlayIfEmpty: false
})
