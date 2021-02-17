import React, { useEffect, useMemo, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CircularProgress, useTheme } from "@material-ui/core"
import { createChart, CrosshairMode, ISeriesApi } from "lightweight-charts"

import { API } from "../../config/types"
import { RootState } from "../../store"
import { subscribe, pause, resume } from "../../features/streams/streamsSlice"
import { createOHLCDataSet, chunkTimestampsIntoDays } from "./utils"

function Chart({ data }: {
    data: API.Event<API.MemberEventMeta>[]
}) {
    const theme = useTheme()

    const containerRef = useRef<HTMLDivElement>(null)
    const candleStickSeriesRef = useRef<ISeriesApi<"Candlestick">>()
    
    const memberCountsOHLC = useMemo(() => {
        return createOHLCDataSet(
            chunkTimestampsIntoDays(data),
            (events) => {
                return events.map(event => event.meta.memberCount)
            }
        )
    }, [data])

    useEffect(() => {
        if (candleStickSeriesRef.current) {
            candleStickSeriesRef.current.update(
                memberCountsOHLC[memberCountsOHLC.length - 1]
            )
        }
    }, [memberCountsOHLC])

    useEffect(() => {
        if (!containerRef.current) {
            return
        }

        const chart = createChart(containerRef.current, {
            width: 600,
            height: 300,
            crosshair: {
                mode: CrosshairMode.Normal
            },
            localization: {
                priceFormatter: Math.floor
            },
            layout: {
                backgroundColor: theme.palette.background.default,
                textColor: theme.palette.common.white
            }
        })

        candleStickSeriesRef.current = chart.addCandlestickSeries()

        candleStickSeriesRef.current.setData(memberCountsOHLC)
    }, [])

    return (
        <div ref={containerRef}/>
    )
}

function MemberChart({ guild }: { guild: API.Guild }) {
    const streamArgs = useMemo<API.StreamArgs>(() => ({
        eventStream: "members",
        guildId: guild.id
    }), [guild.id])

    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.streams[guild.id]?.members.status)
    const data = useSelector(
        (store: RootState) => store.streams[guild.id]?.members.data as API.Event<API.MemberEventMeta>[]
    )

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
            return <div>No data available</div>
        }

        return <Chart data={data}/>
    }

    return <CircularProgress/>
}

export default MemberChart