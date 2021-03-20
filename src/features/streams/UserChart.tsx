import React, { useEffect, useRef } from "react"
import { useTheme } from "@material-ui/core"
import { createChart, ISeriesApi, IChartApi, CrosshairMode } from "lightweight-charts"

import withStreamSubscription from "./withStreamSubscription"
import withBarDataInSeconds from "./withBarDataInSeconds"
import { API } from "../../config/types"

function UserChart({ data, hasMagnetCursor, width, height = 300 }: {
    data: API.OHLCDataset,
    hasMagnetCursor?: boolean,
    width?: number,
    height?: number
}) {
    const theme = useTheme()

    const containerRef = useRef<HTMLDivElement>(null)
    const candleStickSeriesRef = useRef<ISeriesApi<"Candlestick">>()
    const chartRef = useRef<IChartApi>()

    useEffect(() => {
        if (candleStickSeriesRef.current && data.length > 0) {
            candleStickSeriesRef.current.update(
                data[data.length - 1]
            )
        }
    }, [data])

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
        candleStickSeriesRef.current.setData(data)

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

    useEffect(() => {
        if (!chartRef.current) {
            return
        }

        chartRef.current.applyOptions({
            crosshair: {
                mode: hasMagnetCursor ?
                    CrosshairMode.Magnet :
                    CrosshairMode.Normal
            }
        })
    }, [hasMagnetCursor])

    return (
        <div ref={containerRef} />
    )
}

export default withStreamSubscription(
    withBarDataInSeconds(UserChart), "users"
)
