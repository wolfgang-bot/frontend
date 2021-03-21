import { Theme } from "@material-ui/core"
import { API } from "../../config/types"

export type TimestampObject = {
    timestamp: number
}

export const MILLISECONDS_PER_HOUR = 60 * 60 * 1000
export const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR

/**
 * Convert milliseconds to hours
 */
export function millisecondsToHours(milliseconds: number) {
    return milliseconds / MILLISECONDS_PER_HOUR
}

/**
 * Round a number to n places
 */
export function roundToPlaces(number: number, places: number) {
    const factor = Math.pow(10, places)
    return Math.floor(number * factor) / factor
}

export function isSVDataObject(
    dataObject: API.SVDataObject | API.EmptyDataObject
): dataObject is API.SVDataObject {
    return typeof dataObject === "object" && "value" in dataObject
}

export function isOHLCDataObject(
    dataObject: API.OHLCDataObject | API.EmptyDataObject | undefined
): dataObject is API.OHLCDataObject {
    return typeof dataObject === "object" && "close" in dataObject
}

export function isOHLCDataset(dataset: API.Dataset): dataset is API.OHLCDataset {
    return isOHLCDataObject(dataset[0])
}

export function isSVDataset(dataset: API.Dataset): dataset is API.SVDataset {
    return isSVDataObject(dataset[0])
}

export function isSVDatasetWithUpDown(dataset: API.Dataset) {
    return isSVDataset(dataset) && dataset.some(dataObject => (
        isSVDataObject(dataObject) ?
            (dataObject.up || dataObject.down) :
            false
    ))
}

export function isMultiDataset(
    dataset: API.Dataset | API.Dataset[]
): dataset is API.Dataset[] {
    return Array.isArray(dataset[0])
}

export type SVDataObjectWithColor = API.SVDataObject & { color: string }

export function insertThemeIntoSVDataset(
    dataset: API.SVDataset,
    theme: Theme
): (SVDataObjectWithColor | API.EmptyDataObject)[] {
    return dataset.map(dataObject => {
        if (!isSVDataObject(dataObject)) {
            return dataObject
        }

        const trend = Math.sign(dataObject.up - dataObject.down)

        return {
            ...dataObject,
            color: trend === -1 ?
                theme.palette.error.main :
                theme.palette.success.main
        } as SVDataObjectWithColor
    })
}

export function findOHLCDataObject(data: API.OHLCDataset) {
    let i = data.length - 1
    let dataObject = data[i]

    while (!isOHLCDataObject(dataObject)) {
        if (i < 0) {
            return
        }

        dataObject = data[i--]
    }

    return dataObject as API.OHLCDataObject
}

export function getTrendFromOHLCDataset(dataset: API.OHLCDataset) {
    const currentDataObject = dataset[dataset.length - 1]
    const yesterdayDataOject = dataset[dataset.length - 2]

    if (
        !isOHLCDataObject(currentDataObject) ||
        !isOHLCDataObject(yesterdayDataOject)
    ) {
        return 0
    }

    return (currentDataObject.close - yesterdayDataOject.close) / yesterdayDataOject.close
}

export function getTrendFromSVDataset(dataset: API.SVDataset) {
    const currentDataObject = dataset[dataset.length - 1]
    const yesterdayDataOject = dataset[dataset.length - 2]

    if (
        !isSVDataObject(currentDataObject) ||
        !isSVDataObject(yesterdayDataOject)
    ) {
        return 0
    }

    return (currentDataObject.value - yesterdayDataOject.value) / yesterdayDataOject.value
}

export function msToUNIX(ms: number) {
    return Math.floor(ms / 1000)
}

export function datasetWithTheme(dataset: API.Dataset, theme: Theme) {
    return isSVDatasetWithUpDown(dataset) ?
        insertThemeIntoSVDataset(dataset, theme) :
        dataset
}

export function datasetWithUNIX(data: API.Dataset) {
    return data.map((dataObject: API.EmptyDataObject) => ({
        ...dataObject,
        time: msToUNIX(dataObject.time as number)
    })) as API.Dataset
}
