import React from "react"

import { API } from "../../config/types"
import withStreamSubscription from "./withStreamSubscription"
import { findOHLCDataObject, getTrendFromOHLCDataset } from "./utils"
import Trend from "../../components/Styled/Trend"

function ModuleInstanceCount({ guild, data }: {
    guild: API.Guild,
    data: [API.OHLCDataset, API.SVDataset]
}) {
    const lastDataObject = findOHLCDataObject(data[0] || [])

    return (
        <>
            {lastDataObject ? lastDataObject.close : 0}
        </>
    )
}

function _ModuleInstanceTrend({ data }: {
    data: [API.OHLCDataset, API.SVDataset]
}) {
    return <Trend value={getTrendFromOHLCDataset(data[0] || [])} />
}

export default withStreamSubscription(ModuleInstanceCount, "module-instances", {
    showOverlayIfEmpty: false
})

export const ModuleInstanceTrend = withStreamSubscription(_ModuleInstanceTrend, "module-instances", {
    showOverlayIfEmpty: false
})
