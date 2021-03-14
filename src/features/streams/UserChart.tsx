import { useEffect, useMemo, useRef } from "react"
import { useTheme } from "@material-ui/core"
import { createChart, ISeriesApi, IChartApi } from "lightweight-charts"

import { API } from "../../config/types"
import { createOHLCDataSet, chunkTimestampsIntoDays } from "./utils"
import withStreamSubscription from "./withStreamSubscription"

function UserChart({ data, width, height = 300 }: {
    data: API.Event<API.UserEventMeta>[],
    width?: number,
    height?: number
}) {
    const theme = useTheme()

    const containerRef = useRef<HTMLDivElement>(null)
    const candleStickSeriesRef = useRef<ISeriesApi<"Candlestick">>()
    const chartRef = useRef<IChartApi>()

    const userCountsOHLC = useMemo(() => {
        const dayMap = chunkTimestampsIntoDays(data)
        return createOHLCDataSet(
            dayMap,
            (events) => {
                return events.map(event => event.meta.userCount)
            }
        )
    }, [data])

    useEffect(() => {
        if (candleStickSeriesRef.current && userCountsOHLC.length > 0) {
            candleStickSeriesRef.current.update(
                userCountsOHLC[userCountsOHLC.length - 1]
            )
        }
    }, [userCountsOHLC])

    useEffect(() => {
        if (!containerRef.current) {
            return
        }

        chartRef.current = createChart(containerRef.current, {
            width,
            height,
            localization: {
                priceFormatter: Math.floor
            }
        })

        candleStickSeriesRef.current = chartRef.current.addCandlestickSeries()
        candleStickSeriesRef.current.setData(userCountsOHLC)

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!chartRef.current) {
            return
        }

        chartRef.current.applyOptions({
            layout: {
                backgroundColor: theme.palette.background.paper,
                textColor: theme.palette.text.primary
            }
        })
    }, [theme])

    return (
        <div ref={containerRef} />
    )
}

export default withStreamSubscription(UserChart, "users")
