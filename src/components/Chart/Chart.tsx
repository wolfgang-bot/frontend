import { useEffect, useRef } from "react"
import { Theme, useTheme } from "@material-ui/core"
import { createChart, ISeriesApi, IChartApi, CrosshairMode, DeepPartial, ChartOptions } from "lightweight-charts"

import { API } from "../../config/types"
import { insertThemeIntoSVDataset, isOHLCDataObject, isSVDataObject } from "../../features/streams/utils"
import { barDataWithUNIX as datasetWithUNIX } from "../../features/streams/withBarDataInSeconds"

function isMultiDataset(
    dataset: API.Dataset | API.Dataset[]
): dataset is API.Dataset[] {
    return Array.isArray(dataset[0])
}

function isOHLCDataset(dataset: API.Dataset): dataset is API.OHLCDataset {
    return isOHLCDataObject(dataset[0])
}

function isSVDataset(dataset: API.Dataset): dataset is API.SVDataset {
    return isSVDataObject(dataset[0])
}

function isSVDatasetWithUpDown(dataset: API.Dataset) {
    return isSVDataset(dataset) && dataset.some(dataObject => (
        isSVDataObject(dataObject) ?
            (dataObject.up || dataObject.down) :
            false
    ))
}

function datasetWithTheme(dataset: API.Dataset, theme: Theme) {
    return isSVDatasetWithUpDown(dataset) ?
        insertThemeIntoSVDataset(dataset, theme) :
        dataset
}

function transformDataset(dataset: API.Dataset | API.Dataset[], { theme }: {
    theme: Theme
}) {
    const arrayDataset = !isMultiDataset(dataset) ? [dataset] : dataset
    return arrayDataset
        .map(datasetWithUNIX)
        .map(dataset => datasetWithTheme(dataset, theme))
}

function addSeriesFromDataset(chart: IChartApi, dataset: API.Dataset) {
    if (isOHLCDataset(dataset)) {
        return chart.addCandlestickSeries()
    }

    if (isSVDataset(dataset)) {
        return chart.addHistogramSeries()
    }

    throw new Error(`Failed to classify dataset`)
}

function Chart({ data, width, height = 300, hasMagnetCursor, chartOptions = {} }: {
    data: [API.OHLCDataset, API.SVDataset],
    width?: number,
    height?: number,
    hasMagnetCursor?: boolean,
    chartOptions?: DeepPartial<ChartOptions>
}) {
    const theme = useTheme()

    const containerRef = useRef<HTMLDivElement>(null)
    const seriesRefs = useRef<ISeriesApi<any>[]>([])
    const chartRef = useRef<IChartApi>()

    useEffect(() => {
        const datasets = transformDataset(data, { theme })

        seriesRefs.current.forEach((series, i) => {
            const dataset = datasets[i]
            series.update(dataset[dataset.length - 1])
        })

        // eslint-disable-next-line
    }, [data])

    useEffect(() => {
        if (!containerRef.current) {
            return
        }

        const datasets = transformDataset(data, { theme })

        chartRef.current = createChart(containerRef.current, {
            width,
            height,
            localization: {
                priceFormatter: Math.floor
            },
            ...chartOptions
        })

        datasets.forEach((dataset, i) => {
            const series = addSeriesFromDataset(chartRef.current!, dataset)
            seriesRefs.current[i] = series
            series.setData(dataset)
        })

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

export default Chart
