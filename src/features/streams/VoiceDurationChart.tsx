import React, { useEffect, useRef } from "react"
import { useTheme } from "@material-ui/core"
import { createChart, ISeriesApi, IChartApi, CrosshairMode } from "lightweight-charts"

import withStreamSubscription from "./withStreamSubscription"
import withBarDataInSeconds from "./withBarDataInSeconds"
import { API } from "../../config/types"
import { isSVDataObject, millisecondsToHours, roundToPlaces } from "./utils"

function hoursFormatter(value: number) {
    return roundToPlaces(value, 1) + "h"
}

function formatValuesToHours(dataset: API.SVDataset) {
    return dataset.map(dataObject => {
        if (!isSVDataObject(dataObject)) {
            return dataObject
        }

        return {
            ...dataObject,
            value: millisecondsToHours(dataObject.value)
        }
    }) as API.SVDataset
}

function VoiceDurationChart({ data, hasMagnetCursor, width, height = 300 }: {
    data: API.SVDataset,
    hasMagnetCursor?: boolean,
    width?: number,
    height?: number
}) {
    const dataInHours = formatValuesToHours(data || [])
    
    const theme = useTheme()

    const containerRef = useRef<HTMLDivElement>(null)
    const histogramSeriesRef = useRef<ISeriesApi<"Histogram">>()
    const chartRef = useRef<IChartApi>()

    useEffect(() => {
        if (histogramSeriesRef.current && dataInHours.length > 0) {
            histogramSeriesRef.current.update(
                dataInHours[dataInHours.length - 1]
            )
        }
    }, [dataInHours])

    useEffect(() => {
        if (!containerRef.current) {
            return
        }

        chartRef.current = createChart(containerRef.current, {
            width,
            height,
            localization: {
                priceFormatter: hoursFormatter
            }
        })

        histogramSeriesRef.current = chartRef.current.addHistogramSeries()
        histogramSeriesRef.current.setData(dataInHours)

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
    withBarDataInSeconds(VoiceDurationChart), "voice"
)
