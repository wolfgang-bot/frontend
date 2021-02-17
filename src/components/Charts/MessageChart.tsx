import { useMemo } from "react"
import { useTheme } from "@material-ui/core"
import { Bar } from "react-chartjs-2"

import { countTimestampsOfDays } from "./utils"
import withStreamSubscription from "../../features/streams/withStreamSubscription"

function MessageChart({ data }: { data: number[] }) {
    const theme = useTheme()
    
    const partitions = useMemo(() => {
        return countTimestampsOfDays(data)
    }, [data])

    const labels = Array.from(partitions.keys())
        .map((timestamp: number) => new Date(timestamp).toLocaleDateString())

    return (
        <Bar
            data={{ 
                labels,
                datasets: [
                    {
                        label: "Messages",
                        data: Array.from(partitions.values()),
                        backgroundColor: theme.palette.secondary.main
                    }
                ]
            }}
            options={{
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