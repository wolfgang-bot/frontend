import { useMemo } from "react"
import { useTheme } from "@material-ui/core"
import { Bar } from "react-chartjs-2"

import { forEachDayInTimestamps } from "./utils"
import withStreamSubscription from "./withStreamSubscription"

function MessageChart({ data, width, height = 300 }: {
    data: number[],
    width?: number,
    height?: number
}) {
    const theme = useTheme()
    
    const messagesPerDayMap = useMemo(() => {
        return forEachDayInTimestamps(
            data.map(timestamp => ({ timestamp })),
            (_entry, dayMap, currentDay) => {
                const currentValue = dayMap.get(currentDay) || 0
                dayMap.set(currentDay, currentValue + 1)
            }
        )
    }, [data])

    const labels = Array.from(messagesPerDayMap.keys())
        .map((timestamp: number) => new Date(timestamp).toLocaleDateString())

    return (
        <Bar
            width={width}
            height={height}
            data={{ 
                labels,
                datasets: [
                    {
                        label: "Messages",
                        data: Array.from(messagesPerDayMap.values()),
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

export default withStreamSubscription(MessageChart, "messages")