import React from "react"

import { API } from "../../config/types"
import withStreamSubscription from "./withStreamSubscription"
import Trend from "../../components/Styled/Trend"
import { findOHLCDataObject, getTrendFromOHLCDataset } from "./utils"

function UserCount({ guild, data }: {
    guild: API.Guild,
    data: API.OHLCDataset
}) {
    const lastDataObject = findOHLCDataObject(data)

    return (
        <>
            {lastDataObject ? lastDataObject.close : 0}
        </>
    )
}

function _UserTrend({ data }: {
    data: API.OHLCDataset
}) {
    return <Trend value={getTrendFromOHLCDataset(data)} />
}

export default withStreamSubscription(UserCount, "users", {
    showOverlayIfEmpty: false
})

export const UserTrend = withStreamSubscription(_UserTrend, "users", {
    showOverlayIfEmpty: false
})
