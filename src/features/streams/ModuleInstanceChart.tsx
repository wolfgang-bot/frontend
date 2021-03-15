import { useEffect, useMemo, useRef } from "react"
import { useTheme } from "@material-ui/core"
import { createChart, ISeriesApi, IChartApi } from "lightweight-charts"

import { API, EVENT_TYPES } from "../../config/types"
import { createOHLCDataSet, chunkTimestampsIntoDays } from "./utils"
import withStreamSubscription from "./withStreamSubscription"
import { createHistogramDataset } from "./utils"

function ModuleInstanceChart({ data, width, height = 300 }: {
    data: API.Event<API.ModuleInstanceEventMeta>[],
    width?: number,
    height?: number
}) {
    const theme = useTheme()

    const containerRef = useRef<HTMLDivElement>(null)
    const candleStickSeriesRef = useRef<ISeriesApi<"Candlestick">>()
    const histogramSeriesRef = useRef<ISeriesApi<"Histogram">>()
    const chartRef = useRef<IChartApi>()

    const [instanceCountsOHLC, instanceVolume] = useMemo(() => {
        const dayMap = chunkTimestampsIntoDays(data)

        const ohlcDataset = createOHLCDataSet(
            dayMap,
            (events) => {
                return events.map(event => event.meta.instanceCount)
            }
        )

        const histogramDataset = createHistogramDataset(
            dayMap,
            (events) => {
                let delta = 0

                events.forEach(event => {
                    if (event.type === EVENT_TYPES.MODULE_INSTANCE_START) {
                        delta++
                    } else if (event.type === EVENT_TYPES.MODULE_INSTANCE_STOP) {
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
        if (candleStickSeriesRef.current && instanceCountsOHLC.length > 0) {
            candleStickSeriesRef.current.update(
                instanceCountsOHLC[instanceCountsOHLC.length - 1]
            )
        }

        if (histogramSeriesRef.current && instanceVolume.length > 0) {
            histogramSeriesRef.current.update(
                instanceVolume[instanceVolume.length - 1]
            )
        }
    }, [instanceCountsOHLC, instanceVolume])

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
        candleStickSeriesRef.current.setData(instanceCountsOHLC)

        histogramSeriesRef.current = chartRef.current.addHistogramSeries()
        histogramSeriesRef.current.setData(instanceVolume)

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

export default withStreamSubscription(ModuleInstanceChart, "module-instances")
