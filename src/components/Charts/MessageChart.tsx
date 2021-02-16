import React, { useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CircularProgress, useTheme } from "@material-ui/core"
import { Bar } from "react-chartjs-2"

import { API } from "../../config/types"
import { RootState } from "../../store"
import { subscribe, pause, resume } from "../../features/streams/streamsSlice"
import { countTimestampsOfDays } from "./utils"

function Chart({ data }: { data: number[] }) {
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

function MessageChart({ guild }: { guild: API.Guild }) {
    const streamArgs = useMemo<API.StreamArgs>(() => ({
        eventStream: "messages",
        guildId: guild.id
    }), [guild.id])

    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.streams[guild.id]?.messages.status)
    const data = useSelector((store: RootState) => store.streams[guild.id]?.messages.data as number[])

    useEffect(() => {
        if (status === "idle") {
            dispatch(subscribe(streamArgs))
        } else if (status === "paused") {
            dispatch(resume(streamArgs))
        }
    }, [dispatch, streamArgs, status])

    useEffect(() => {
        return () => {
            dispatch(pause(streamArgs))
        }
    }, [dispatch, streamArgs])

    if (status !== "idle") {
        if (data.length === 0) {
            return <div>No data available</div>
        }

        return <Chart data={data}/>
    }

    return <CircularProgress/>
}

export default MessageChart