import { useEffect, useMemo, useRef } from "react"
import { useTheme } from "@material-ui/core"
import { createChart, CrosshairMode, ISeriesApi, IChartApi } from "lightweight-charts"

import { API, EVENT_TYPES } from "../../config/types"
import { createOHLCDataSet, chunkTimestampsIntoDays } from "./utils"
import withStreamSubscription from "./withStreamSubscription"
import { createHistogramDataset } from "./utils"

function MemberChart({ data, width, height = 300 }: {
    data: API.Event<API.MemberEventMeta>[],
    width?: number,
    height?: number
}) {
    const theme = useTheme()

    const containerRef = useRef<HTMLDivElement>(null)
    const candleStickSeriesRef = useRef<ISeriesApi<"Candlestick">>()
    const histogramSeriesRef = useRef<ISeriesApi<"Histogram">>()
    const chartRef = useRef<IChartApi>()
    
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
    }, [data, theme.palette.error.main, theme.palette.success.main])

    useEffect(() => {
        if (candleStickSeriesRef.current && memberCountsOHLC.length > 0) {
            candleStickSeriesRef.current.update(
                memberCountsOHLC[memberCountsOHLC.length - 1]
            )
        }

        if (histogramSeriesRef.current && memberVolumes.length > 0) {
            histogramSeriesRef.current.update(
                memberVolumes[memberVolumes.length - 1]
            )
        }
    }, [memberCountsOHLC, memberVolumes])

    useEffect(() => {
        if (!containerRef.current) {
            return
        }

        chartRef.current = createChart(containerRef.current, {
            width,
            height,
            crosshair: {
                mode: CrosshairMode.Normal
            },
            localization: {
                priceFormatter: Math.floor
            }
        })

        candleStickSeriesRef.current = chartRef.current.addCandlestickSeries()
        candleStickSeriesRef.current.setData(memberCountsOHLC)

        histogramSeriesRef.current = chartRef.current.addHistogramSeries()
        histogramSeriesRef.current.setData(memberVolumes)

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!chartRef.current) {
            return
        }

        chartRef.current.applyOptions({
            layout: {
                backgroundColor: theme.palette.background.paper,
                textColor: theme.palette.common.white
            }
        })
    }, [theme])

    return (
        <div ref={containerRef}/>
    )
}

export default withStreamSubscription(MemberChart, "members")