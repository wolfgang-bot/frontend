import { BarData, WhitespaceData } from "lightweight-charts"

export type TimestampObject = {
    timestamp: number
}

export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

/**
 * Round a UNIX timestamp to the last full hour
 * 
 * --Example--
 * 
 * Input:
 * 
 * UNIX for 01.01.2021 12:30:30
 * 
 * Output:
 * 
 * UNIX for 01.01.2021 12:00:00
 */
export function roundToLastFullHour(timestamp: number) {
    const date = new Date(timestamp)
    const deltaSeconds = date.getMinutes() * 60 + date.getSeconds()
    const deltaMilliseconds = deltaSeconds * 1000 + date.getMilliseconds()
    return timestamp - deltaMilliseconds
}

/**
 * Round a UNIX timestamp to the last full day
 * 
 * --Example--
 * 
 * Input:
 * 
 * UNIX for 01.01.2021 12:30:30
 * 
 * Output:
 * 
 * UNIX for 01.01.2021 00:00:00
 */
export function roundToLastFullDay(timestamp: number) {
    const date = new Date(timestamp)
    const deltaMilliseconds = date.getHours() * 60 * 60 * 1000
    return roundToLastFullHour(timestamp) - deltaMilliseconds
}

/**
 * Create an array with an element for each day between the two given
 * timestamps. The elements are timestamps representing 00:00 at each day.
 *
 * --Example--
 *
 * Input:
 * 
 * UNIX for 01.01.2021
 * UNIX for 03.01.2021
 * 
 * Output:
 * 
 * [
 *      UNIX for 01.01.2021,
 *      UNIX for 02.01.2021,
 *      UNIX for 03.01.2021
 * ]
 */
export function getDaysBetweenTimestamps(
    fromTimestamp: number,
    toTimestamp: number
) {
    const result: number[] = []

    const from = roundToLastFullDay(fromTimestamp)
    const to = roundToLastFullDay(toTimestamp)

    for (let i = 0; i < (to - from + 1) / MILLISECONDS_PER_DAY; i++) {
        const newKey = from + i * MILLISECONDS_PER_DAY
        result.push(newKey)
    }

    return result
}

/**
 * Create a map with a key and `null` value for each day between the
 * two given timestamps. The keys are timestamps for 00:00 at each day.
 * 
 * --Example--
 * 
 * Input:
 * 
 * UNIX for 01.01.2021
 * UNIX for 03.01.2021
 * 
 * Output:
 * 
 * Map: {
 *      [UNIX for 01.01.2021]: null,
 *      [UNIX for 02.01.2021]: null,
 *      [UNIX for 03.01.2021]: null
 * }
 */
export function createEmptyDayMap(
    fromTimestamp: number,
    toTimestamp: number
) {
    const result = new Map<number, null>()

    const keys = getDaysBetweenTimestamps(fromTimestamp, toTimestamp)

    for (let key of keys) {
        result.set(key, null)
    }

    return result
}

/**
 * Create a map where the keys are timestamps for each day at 00:00 since
 * the earliest timestamp in the given array. The values may be generated
 * by the given callback.
 * Assumes that the given array of timestamps is sorted in ascending order.
 * 
 * --Example--
 * 
 * Input:
 * 
 * timestamps: [
 *      UNIX between 01.01.2021 00:00:00 and 01.01.2021 23:59:59,
 *      UNIX between 01.01.2021 00:00:00 and 01.01.2021 23:59:59,
 *      UNIX between 01.01.2021 00:00:00 and 01.01.2021 23:59:59,
 *      UNIX between 03.01.2021 00:00:00 and 03.01.2021 23:59:59
 * ]
 * 
 * Output:
 * 
 * Map: {
 *      [UNIX for 01.01.2021]: ... (default: null),
 *      [UNIX for 02.01.2021]: ... (default: null),
 *      [UNIX for 03.01.2021]: ... (default: null)
 * }
 */
export function forEachDayInTimestamps<T extends TimestampObject>(
    data: T[],
    callback: (
        entry: T,
        dayMap: Map<number, number | null>,
        currentDay: number
    ) => void
) {
    if (data.length === 0) {
        return new Map<number, number | null>()
    }

    const dayMap: Map<number, number | null> = createEmptyDayMap(
        data[0].timestamp,
        Date.now()
    )

    const days = Array.from(dayMap.keys())
    let currentDayIndex = 0

    for (let entry of data) {
        while (entry.timestamp >= days[currentDayIndex + 1]) {
            currentDayIndex++
        }

        callback(entry, dayMap, days[currentDayIndex])
    }

    return dayMap
}

/**
 * Create a map where the keys are timestamps for each day at 00:00 since
 * the earliest timestamp in the given array. The values are all timestamps
 * included in the given array which are in between the beginning and the
 * end of the day.
 * Assumes that the given array of timestamps is sorted in ascending order.
 * 
 * --Example--
 *
 * Input:
 * 
 * timestamps: [
 *      UNIX between 01.01.2021 00:00:00 and 01.01.2021 23:59:59,
 *      UNIX between 01.01.2021 00:00:00 and 01.01.2021 23:59:59,
 *      UNIX between 01.01.2021 00:00:00 and 01.01.2021 23:59:59,
 *      UNIX between 03.01.2021 00:00:00 and 03.01.2021 23:59:59
 * ]
 * 
 * Output:
 * 
 * Map: {
 *      [UNIX for 01.01.2021]: [
 *          UNIX between 01.01.2021 00:00:00 and 01.01.2021 23:59:59,
 *          UNIX between 01.01.2021 00:00:00 and 01.01.2021 23:59:59,
 *          UNIX between 01.01.2021 00:00:00 and 01.01.2021 23:59:59
 *      ],
 *      [UNIX for 02.01.2021]: null,
 *      [UNIX for 03.01.2021]: [
 *          UNIX between 03.01.2021 00:00:00 and 03.01.2021 23:59:59
 *      ]
 * }
 */
export function chunkTimestampsIntoDays<T extends TimestampObject>(data: T[]) {
    if (data.length === 0) {
        return new Map<number, T[] | null>()
    }

    const dayMap: Map<number, T[] | null> = createEmptyDayMap(
        data[0].timestamp,
        Date.now()
    )

    const days = Array.from(dayMap.keys())
    let currentDayIndex = 0

    for (let entry of data) {
        while (entry.timestamp >= days[currentDayIndex + 1]) {
            currentDayIndex++
        }

        const currentDay = days[currentDayIndex]

        let currentDayEntries = dayMap.get(currentDay)

        if (!currentDayEntries) {
            currentDayEntries = []
            dayMap.set(currentDay, currentDayEntries)
        }

        currentDayEntries.push(entry)
    }

    return dayMap
}

/**
 * Create a OHLC (open, high, low, close) dataset from a map
 * where the keys are timestamps and the values are arrays
 * of some datatype T. The second parameter defines how to
 * extract numeric values out of an array of T.
 * 
 * --Example--
 * 
 * Input:
 * 
 * Map: {
 *      [UNIX for 01.01.2021 12:00]: [
 *          { abc: 10 },
 *          { abc: 5 },
 *          { abc: 13 }
 *      ]
 * }
 * (values) => values.map(entry => entry.abc)
 * 
 * Output:
 * 
 * [
 *      {
 *          time: [UTC-String for 01.01.2021 12:00],
 *          open: 10,
 *          close: 13,
 *          high: 13,
 *          low: 5
 *      }
 * ] 
 */
export function createOHLCDataSet<T>(
    dayMap: Map<number, T[] | null>,
    getNumericValues: (values: T[]) => number[]
) {
    const dataset: (BarData | WhitespaceData)[] = []

    dayMap.forEach((values, key) => {
        const time = new Date(key).toUTCString()

        if (!values || values.length === 0) {
            dataset.push({ time })
        } else {
            const newValues = getNumericValues(values)

            dataset.push({
                time,
                open: newValues[0],
                close: newValues[newValues.length - 1],
                high: Math.max(...newValues),
                low: Math.min(...newValues)
            })
        }
    })

    return dataset
}

/**
 * Create a histogram dataset from a map where the keys are
 * timestamps and the values are arrays of some datatype T.
 * The second parameter defines how to generate an entry for
 * the dataset consisting of a value and a color out of an
 * array of T.
 *
 * --Example--
 *
 * Input:
 *
 * Map: {
 *      [UNIX for 01.01.2021 12:00]: [
 *          { abc: 10 },
 *          { abc: 5 },
 *          { abc: 13 }
 *      ]
 * }
 * (values) => ({
 *      time: [UNIX for 01.01.2021 12:00],
 *      value: values.length,
 *      color: "blue"
 * })
 *
 * Output:
 *
 * [
 *      {
 *          time: [UNIX for 01.01.2021 12:00],
 *          value: 3,
 *          color: "blue"
 *      }
 * ]
 */
export function createHistogramDataset<T>(
    dayMap: Map<number, T[] | null>,
    getValuesForDay: (values: T[]) => {
        value: number,
        color: string
    }
) {
    const dataset: (BarData | WhitespaceData)[] = []

    dayMap.forEach((values, key) => {
        const time = new Date(key).toUTCString()

        if (!values || values.length === 0) {
            dataset.push({ time })
        } else {
            dataset.push({
                time,
                ...getValuesForDay(values)
            })
        }
    })

    return dataset
}

/**
 * Get all timestamp objects where the timestamp is in between
 * to given timestamps.
 */
export function getTimestampsBetween<T extends TimestampObject>(
    data: T[],
    from: number,
    to: number
) {
    const result: T[] = []

    for (let entry of data) {
        if (entry.timestamp >= from && entry.timestamp <= to) {
            result.push(entry)
        }
    }

    return result
}
