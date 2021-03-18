import React, { useEffect, useRef } from "react"
import { useTheme } from "@material-ui/core"
import { createChart, ISeriesApi, IChartApi } from "lightweight-charts"

import withStreamSubscription from "./withStreamSubscription"
import withBarDataInSeconds from "./withBarDataInSeconds"
import { API } from "../../config/types"

function MessageChart({ data, width, height = 300 }: {
    data: API.SVDataset,
    width?: number,
    height?: number
}) {
    const theme = useTheme()

    const containerRef = useRef<HTMLDivElement>(null)
    const histogramSeriesRef = useRef<ISeriesApi<"Histogram">>()
    const chartRef = useRef<IChartApi>()

    useEffect(() => {
        if (histogramSeriesRef.current && data.length > 0) {
            histogramSeriesRef.current.update(
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

        histogramSeriesRef.current = chartRef.current.addHistogramSeries()
        histogramSeriesRef.current.setData(data)

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

export default withStreamSubscription(
    withBarDataInSeconds(MessageChart), "messages"
)
