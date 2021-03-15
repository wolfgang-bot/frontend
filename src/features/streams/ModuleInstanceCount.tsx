import React, { useMemo } from "react"

import { API } from "../../config/types"
import withStreamSubscription from "./withStreamSubscription"
import { roundToLastFullDay, MILLISECONDS_PER_DAY, getTimestampsBetween } from "./utils"
import Trend from "../../components/Styled/Trend"

function ModuleInstanceCount({ guild, data }: {
    guild: API.Guild,
    data: API.Event<API.ModuleInstanceEventMeta>[]
}) {
    return (
        <>
            {data.length > 0 ? data[data.length - 1].meta.instanceCount : 0}
        </>
    )
}

function _ModuleInstanceTrend({ data }: {
    data: API.Event<API.ModuleInstanceEventMeta>[]
}) {
    const trend = useMemo(() => {
        if (!data.length) {
            return 0
        }

        const to = roundToLastFullDay(Date.now())
        const from = to - MILLISECONDS_PER_DAY

        const yesterdayEvents = getTimestampsBetween(data, from, to)

        if (yesterdayEvents.length === 0) {
            return 0
        }

        const currentCount = data[data.length - 1].meta.instanceCount
        const lastCount = yesterdayEvents[yesterdayEvents.length - 1].meta.instanceCount

        return (currentCount - lastCount) / lastCount
    }, [data])

    return <Trend value={trend} />
}

export default withStreamSubscription(ModuleInstanceCount, "module-instances", {
    showOverlayIfEmpty: false
})

export const ModuleInstanceTrend = withStreamSubscription(_ModuleInstanceTrend, "module-instances", {
    showOverlayIfEmpty: false
})
