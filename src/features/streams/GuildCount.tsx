import React from "react"

import { API } from "../../config/types"
import withStreamSubscription from "./withStreamSubscription"
import { findOHLCDataObject, getTrendFromOHLCDataset } from "./utils"
import Trend from "../../components/Styled/Trend"

function GuildCount({ guild, data }: {
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

function _GuildTrend({ data }: {
    data: [API.OHLCDataset, API.SVDataObject]
}) {
    return <Trend value={getTrendFromOHLCDataset(data[0] || [])} />
}

export default withStreamSubscription(GuildCount, "guilds", {
    showOverlayIfEmpty: false
})

export const GuildTrend = withStreamSubscription(_GuildTrend, "guilds", {
    showOverlayIfEmpty: false
})
