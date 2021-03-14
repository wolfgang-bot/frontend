import React, { useMemo } from "react"

import { API } from "../../config/types"
import withStreamSubscription from "./withStreamSubscription"
import { roundToLastFullDay, MILLISECONDS_PER_DAY, getTimestampsBetween } from "./utils"
import Trend from "../../components/Styled/Trend"

function GuildCount({ guild, data }: {
    guild: API.Guild,
    data: API.Event<API.GuildEventMeta>[]
}) {
    return (
        <>
            {data.length > 0 ? data[data.length - 1].meta.guildCount : 0}
        </>
    )
}

function _GuildTrend({ data }: {
    data: API.Event<API.GuildEventMeta>[]
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

        const currentCount = data[data.length - 1].meta.guildCount
        const lastCount = yesterdayEvents[yesterdayEvents.length - 1].meta.guildCount

        return (currentCount - lastCount) / lastCount
    }, [data])

    return <Trend value={trend} />
}

export default withStreamSubscription(GuildCount, "guilds", {
    showOverlayIfEmpty: false
})

export const GuildTrend = withStreamSubscription(_GuildTrend, "guilds", {
    showOverlayIfEmpty: false
})
