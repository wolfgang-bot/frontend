export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

/**
 * Round a UNIX timestamp to the last full hour
 * 
 * Example:
 * 
 * UNIX for 01.01.2021 12:30:30
 * -->
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
 * Example:
 * 
 * UNIX for 01.01.2021 12:30:30
 * -->
 * UNIX for 01.01.2021 00:00:00
 */
export function roundToLastFullDay(timestamp: number) {
    const date = new Date(timestamp)
    const deltaMilliseconds = date.getHours() * 60 * 60 * 1000
    return roundToLastFullHour(timestamp) - deltaMilliseconds
}

/**
 * Create a map with a key and `null` value for each day between the
 * two given timestamps. The keys are timestamps for 00:00 at each day.
 * 
 * Example:
 * 
 * UNIX for 01.01.2021
 * UNIX for 03.01.2021
 * -->
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

    const from = roundToLastFullDay(fromTimestamp)
    const to = roundToLastFullDay(toTimestamp)

    for (let i = 0; i < (to - from + 1) / MILLISECONDS_PER_DAY; i++) {
        const newKey = from + i * MILLISECONDS_PER_DAY
        result.set(newKey, null)
    }

    return result
}

/**
 * Create a map where the keys are timestamps for each day at 00:00 since
 * the earliest timestamp in the given array. The values are the amount of
 * timestamps in the given array, which are in between the beginning and the
 * end of the day.
 * Assumes that the given array of timestamps is sorted in ascending order.
 * 
 * Example:
 * 
 * timestamps: [
 *      UNIX between 01.01.2021 00:00:00 and 01.01.2021 23:59:59,
 *      UNIX between 01.01.2021 00:00:00 and 01.01.2021 23:59:59,
 *      UNIX between 01.01.2021 00:00:00 and 01.01.2021 23:59:59,
 *      UNIX between 03.01.2021 00:00:00 and 03.01.2021 23:59:59
 * ]
 * -->
 * Map: {
 *      [UNIX for 01.01.2021]: 3,
 *      [UNIX for 02.01.2021]: null,
 *      [UNIX for 03.01.2021]: 1
 * }
 */
export function countTimestampsOfDays(timestamps: number[]) {
    const dayMap: Map<number, number | null> = createEmptyDayMap(
        timestamps[0],
        Date.now()
    )

    const days = Array.from(dayMap.keys())
    let currentDayIndex = 0

    for (let i = 0; i < timestamps.length; i++) {
        while (timestamps[i] >= days[currentDayIndex + 1]) {
            currentDayIndex++
        }

        const currentValue = dayMap.get(days[currentDayIndex]) || 0
        dayMap.set(days[currentDayIndex], currentValue + 1)
    }

    return dayMap
}
