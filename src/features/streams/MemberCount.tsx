import React, { useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import Skeleton from "@material-ui/lab/Skeleton"

import { API } from "../../config/types"
import { RootState } from "../../store"
import { fetchMemberCount } from "../guilds/guildsSlice"
import withStreamSubscription from "./withStreamSubscription"
import { roundToLastFullDay, MILLISECONDS_PER_DAY, getTimestampsBetween } from "./utils"
import Trend from "../../components/Styled/Trend"

function MemberCount({ guild, data }: {
    guild: API.Guild,
    data: API.Event<API.MemberEventMeta>[]
}) {
    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.guilds.data[guild.id]?.memberCount.status)
    const apiMemberCount = useSelector((store: RootState) => store.guilds.data[guild.id]?.memberCount.data)
    const error = useSelector((store: RootState) => store.guilds.data[guild.id]?.memberCount.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMemberCount(guild.id))
        }
    }, [status, dispatch, guild.id])

    if (status === "success" || data.length > 0) {
        return (
            <>
                {
                    data.length > 0 ?
                    data[data.length - 1].meta.memberCount :
                    apiMemberCount
                }
            </>
        )
    }

    if (status === "error") {
        return <>{error}</>
    }

    return <Skeleton variant="rect" width={50} height={41}/>
}

function _MemberTrend({ data }: {
    data: API.Event<API.MemberEventMeta>[]
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

        const currentCount = data[data.length - 1].meta.memberCount
        const lastCount = yesterdayEvents[yesterdayEvents.length - 1].meta.memberCount

        const trend = (currentCount - lastCount) / lastCount
        return Math.floor(trend * 100)
    }, [data])

    return <Trend value={trend}/>
}

export default withStreamSubscription(MemberCount, "members", {
    showOverlayIfEmpty: false
})

export const MemberTrend = withStreamSubscription(_MemberTrend, "members", {
    showOverlayIfEmpty: false
})