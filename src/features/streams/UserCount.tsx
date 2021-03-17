import React, { useMemo } from "react"

import { API } from "../../config/types"
import withStreamSubscription from "./withStreamSubscription"
import Trend from "../../components/Styled/Trend"

function isOHLCDataObject(
    dataObject: API.OHLCDataObject | API.EmptyDataObject | undefined
): dataObject is API.OHLCDataObject {
    return !dataObject ? false : "close" in dataObject
}

function findOHLCDataPoint(data: API.OHLCDataset) {
    let i = data.length - 1
    let dataObject = data[i]

    while (!isOHLCDataObject(dataObject)) {
        dataObject = data[i--]

        if (i <= 0) {
            return
        }
    }

    return dataObject as API.OHLCDataObject
}

function UserCount({ guild, data }: {
    guild: API.Guild,
    data: API.OHLCDataset
}) {
    const lastDatapoint = findOHLCDataPoint(data)

    return (
        <>
            {lastDatapoint ? lastDatapoint.close : 0}
        </>
    )
}

function _UserTrend({ data }: {
    data: API.OHLCDataset
}) {
    const trend = useMemo(() => {
        const currentDataObject = data[data.length - 1]
        const yesterdayDataOject = data[data.length - 2]

        if (
            !isOHLCDataObject(currentDataObject) ||
            !isOHLCDataObject(yesterdayDataOject)
        ) {
            return 0
        }

        return (currentDataObject.close - yesterdayDataOject.close) / yesterdayDataOject.close
    }, [data])

    return <Trend value={trend} />
}

export default withStreamSubscription(UserCount, "users", {
    showOverlayIfEmpty: false
})

export const UserTrend = withStreamSubscription(_UserTrend, "users", {
    showOverlayIfEmpty: false
})
