import { useEffect, useMemo, useRef } from "react"
import { useTheme } from "@material-ui/core"
import { createChart, CrosshairMode, ISeriesApi } from "lightweight-charts"

import { API } from "../../config/types"
import { createOHLCDataSet, chunkTimestampsIntoDays } from "./utils"
import withStreamSubscription from "../../features/streams/withStreamSubscription"

function MemberChart({ data }: {
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

        // eslint-disable-next-line
    }, [])

    return (
        <div ref={containerRef}/>
    )
}

export default withStreamSubscription(MemberChart, "members")