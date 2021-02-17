import React, { useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CircularProgress } from "@material-ui/core"

import { RootState } from "../../store"
import { API } from "../../config/types"
import { subscribe, pause, resume } from "./streamsSlice"

function withStreamSubscription(
    Child: React.FunctionComponent<any>,
    stream: API.EVENT_STREAM
) {
    return function StreamWrapper(props: React.ComponentProps<typeof Child>) {
        if (!props.guild) {
            throw new Error(`Missing prop: 'guild'`)
        }

        const streamArgs = useMemo<API.StreamArgs>(() => ({
            eventStream: stream,
            guildId: props.guild.id
        }), [props.guild.id])

        const dispatch = useDispatch()

        const status = useSelector((store: RootState) => store.streams[props.guild.id]?.[stream].status)
        const data = useSelector((store: RootState) => store.streams[props.guild.id]?.[stream].data)

        useEffect(() => {
            if (status === "idle") {
                dispatch(subscribe(streamArgs))
            } else if (status === "paused") {
                dispatch(resume(streamArgs))
            }
        }, [streamArgs, status, dispatch])

        useEffect(() => {
            return () => {
                dispatch(pause(streamArgs))
            }
        }, [streamArgs, dispatch])

        if (status === "flowing") {
            if (data.length === 0) {
                return (
                    <div>No data available</div>
                )
            }

            return (
                <Child data={data}/>
            )
        }

        return <CircularProgress/>
    }
}

export default withStreamSubscription