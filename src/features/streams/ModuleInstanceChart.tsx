import { useEffect, useRef } from "react"
import { useTheme } from "@material-ui/core"
import { createChart, ISeriesApi, IChartApi, CrosshairMode } from "lightweight-charts"

import { API } from "../../config/types"
import { insertThemeIntoSVDataset } from "./utils"
import withStreamSubscription from "./withStreamSubscription"
import withBarDataInSeconds from "./withBarDataInSeconds"

function ModuleInstanceChart({ data, hasMagnetCursor, width, height = 300 }: {
    data: [API.OHLCDataset, API.SVDataset],
    hasMagnetCursor?: boolean,
    width?: number,
    height?: number
}) {
    const theme = useTheme()

    let [OHLCDataset = [], SVDataset = []] = data
    SVDataset = insertThemeIntoSVDataset(SVDataset, theme)

    const containerRef = useRef<HTMLDivElement>(null)
    const candleStickSeriesRef = useRef<ISeriesApi<"Candlestick">>()
    const histogramSeriesRef = useRef<ISeriesApi<"Histogram">>()
    const chartRef = useRef<IChartApi>()

    useEffect(() => {
        if (candleStickSeriesRef.current && OHLCDataset.length > 0) {
            candleStickSeriesRef.current.update(
                OHLCDataset[OHLCDataset.length - 1]
            )
        }

        if (histogramSeriesRef.current && SVDataset.length > 0) {
            histogramSeriesRef.current.update(
                SVDataset[SVDataset.length - 1]
            )
        }
    }, [OHLCDataset, SVDataset])

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
        candleStickSeriesRef.current.setData(OHLCDataset)

        histogramSeriesRef.current = chartRef.current.addHistogramSeries()
        histogramSeriesRef.current.setData(SVDataset)

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
    withBarDataInSeconds(ModuleInstanceChart, { multiDataset: true })
, "module-instances")
