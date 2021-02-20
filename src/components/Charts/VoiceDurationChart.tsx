import { useMemo } from "react"
import { Bar } from "react-chartjs-2"
import { useTheme } from "@material-ui/core"

import { API } from "../../config/types"
import withStreamSubscription from "../../features/streams/withStreamSubscription"
import { forEachDayInTimestamps } from "./utils"

const MILLISECONDS_PER_HOUR = 60 * 60 * 1000

function millisecondsToHours(milliseconds: number) {
    return milliseconds / MILLISECONDS_PER_HOUR
}

function roundToTwoPlaces(number: number) {
    return Math.floor(number * 100) / 100
}

function VoiceDurationChart({ data, width, height = 300 }: {
    data: API.Event<API.VoiceEventMeta>[],
    width?: number,
    height?: number
}) {
    const theme = useTheme()

    const voiceDurationPerDayMap = useMemo(() => {
        return forEachDayInTimestamps(
            data,
            (entry, dayMap, currentDay) => {
                const currentValue = dayMap.get(currentDay) || 0
                dayMap.set(currentDay, currentValue + entry.meta.duration)
            }
        )
    }, [data])

    const labels = Array.from(voiceDurationPerDayMap.keys())
        .map((timestamp: number) => new Date(timestamp).toLocaleDateString())

    const values = Array.from(voiceDurationPerDayMap.values())
        .map((duration: number | null) => (
            duration === null ? null : roundToTwoPlaces(millisecondsToHours(duration))
        ))

    return (
        <Bar
            width={width}
            height={height}
            data={{
                labels,
                datasets: [
                    {
                        label: "Voice Duration",
                        data: values,
                        backgroundColor: theme.palette.primary.main
                    }
                ]
            }}
            options={{
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                },
                legend: {
                    display: false
                }
            }}
        />
    )
}

export default withStreamSubscription(VoiceDurationChart, "voice")