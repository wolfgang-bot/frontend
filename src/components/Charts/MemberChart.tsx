import { useEffect, useMemo, useRef } from "react"
import { useTheme } from "@material-ui/core"
import { createChart, CrosshairMode, ISeriesApi } from "lightweight-charts"

import { API, EVENT_TYPES } from "../../config/types"
import { createOHLCDataSet, chunkTimestampsIntoDays } from "./utils"
import withStreamSubscription from "../../features/streams/withStreamSubscription"
import { createHistogramDataset } from "./utils"

function MemberChart({ data }: {
    data: API.Event<API.MemberEventMeta>[]
}) {
    const theme = useTheme()

    const containerRef = useRef<HTMLDivElement>(null)
    const candleStickSeriesRef = useRef<ISeriesApi<"Candlestick">>()
    
    const [memberCountsOHLC, memberVolumes] = useMemo(() => {
        const dayMap = chunkTimestampsIntoDays(data)

        const ohlcDataset = createOHLCDataSet(
            dayMap,
            (events) => {
                return events.map(event => event.meta.memberCount)
            }
        )

        const histogramDataset = createHistogramDataset(
            dayMap,
            (events) => {
                let delta = 0

                events.forEach(event => {
                    if (event.type === EVENT_TYPES.GUILD_MEMBER_ADD) {
                        delta++
                    } else if (event.type === EVENT_TYPES.GUILD_MEMBER_REMOVE) {
                        delta--
                    }
                })

                return {
                    value: events.length,
                    color: delta < 0 ? theme.palette.error.main : theme.palette.success.main
                }
            }
        )

        return [ohlcDataset, histogramDataset]
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

        const volumeSeries = chart.addHistogramSeries()
        
        volumeSeries.setData(memberVolumes)

        // eslint-disable-next-line
    }, [])

    return (
        <div ref={containerRef}/>
    )
}

export default withStreamSubscription(MemberChart, "members")