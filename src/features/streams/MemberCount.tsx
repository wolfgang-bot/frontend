import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Skeleton from "@material-ui/lab/Skeleton"

import { API } from "../../config/types"
import { RootState } from "../../store"
import { fetchMemberCount } from "../guilds/guildsSlice"
import withStreamSubscription from "./withStreamSubscription"
import { isOHLCDataObject, getTrendFromOHLCDataset } from "./utils"
import Trend from "../../components/Styled/Trend"

function MemberCount({ guild, data }: {
    guild: API.Guild,
    data: [API.OHLCDataset, API.SVDataset]
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

    const OHLCDataset = data[0] || []
    const lastDataObject = OHLCDataset[OHLCDataset.length - 1]

    if (status === "success" || data.length > 0) {
        return (
            <>
                {
                    lastDataObject && isOHLCDataObject(lastDataObject) ?
                    lastDataObject.close :
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
    data: [API.OHLCDataset, API.SVDataset]
}) {
    return <Trend value={getTrendFromOHLCDataset(data[0] || [])}/>
}

export default withStreamSubscription(MemberCount, "members", {
    showOverlayIfEmpty: false
})

export const MemberTrend = withStreamSubscription(_MemberTrend, "members", {
    showOverlayIfEmpty: false
})
