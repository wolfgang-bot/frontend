import React from "react"

import withStreamSubscription from "./withStreamSubscription"
import { isSVDataObject, getTrendFromSVDataset } from "./utils"
import Trend from "../../components/Styled/Trend"
import { API } from "../../config/types"

function MessagesAtDay({ data }: {
    data: API.SVDataset
}) {
    const currentDataObject = data[data.length - 1]

    if (!isSVDataObject(currentDataObject)) {
        return <>0</>
    }

    return <>{currentDataObject.value}</>
}

function _MessagesAtDayTrend({ data }: {
    data: API.SVDataset
}) {
    return <Trend value={getTrendFromSVDataset(data)}/>
}

export default withStreamSubscription(MessagesAtDay, "messages")

export const MessagesAtDayTrend = withStreamSubscription(_MessagesAtDayTrend, "messages", {
    showOverlayIfEmpty: false
})
