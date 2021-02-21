import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Skeleton from "@material-ui/lab/Skeleton"

import { API } from "../../config/types"
import { RootState } from "../../store"
import { fetchMemberCount } from "../guilds/guildsSlice"
import withStreamSubscription from "./withStreamSubscription"

function MemberCount({ guild, data }: {
    guild: API.Guild,
    data: API.Event<API.MemberEventMeta>
}) {
    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.guilds.data[guild.id]?.memberCount.status)
    const memberCount = useSelector((store: RootState) => store.guilds.data[guild.id]?.memberCount.data)
    const error = useSelector((store: RootState) => store.guilds.data[guild.id]?.memberCount.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMemberCount(guild.id))
        }
    }, [status, dispatch, guild.id])

    if (status === "success") {
        return <>{memberCount}</>
    }

    if (status === "error") {
        return <>{error}</>
    }

    return <Skeleton variant="rect" width={50} height={41}/>
}

export default withStreamSubscription(MemberCount, "members", {
    showOverlayIfEmpty: false
})