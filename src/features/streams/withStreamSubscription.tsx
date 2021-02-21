import React, { useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CircularProgress, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RootState } from "../../store"
import { API } from "../../config/types"
import { subscribe, pause, resume } from "./streamsSlice"

export type SubscriptionOptions = {
    showOverlayIfEmpty: boolean
}

const useStyles = makeStyles({
    overlayContainer: {
        position: "relative"
    },

    overlay: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, .67)",
        zIndex: 1
    }    
})

function Overlay({ overlay, children }: React.PropsWithChildren<{
    overlay: React.ReactElement
}>) {
    const classes = useStyles()

    return (
        <div className={classes.overlayContainer}>
            {children}

            <div className={classes.overlay}>
                {overlay}
            </div>
        </div>
    )
}

function withStreamSubscription(
    Child: React.FunctionComponent<any>,
    stream: API.EVENT_STREAM,
    options?: SubscriptionOptions
) {
    return function StreamWrapper(props: React.ComponentProps<typeof Child>) {
        if (!props.guild) {
            throw new Error(`Missing prop: 'guild'`)
        }

        const streamArgs = useMemo<API.StreamArgs>(() => ({
            eventStream: stream,
            guildId: props.guild.id
        }), [props.guild.id])

        const dispatch = useDispatch()

        const status = useSelector((store: RootState) => store.streams[props.guild.id]?.[stream].status)
        const data = useSelector((store: RootState) => store.streams[props.guild.id]?.[stream].data)

        useEffect(() => {
            if (status === "idle") {
                dispatch(subscribe(streamArgs))
            } else if (status === "paused") {
                dispatch(resume(streamArgs))
            }
        }, [streamArgs, status, dispatch])

        useEffect(() => {
            return () => {
                dispatch(pause(streamArgs))
            }
        }, [streamArgs, dispatch])

        if (status === "flowing") {
            if (data.length === 0 && options?.showOverlayIfEmpty !== false) {
                return (
                    <Overlay
                        overlay={(
                            <Typography variant="h6">No data available</Typography>
                        )}
                    >
                        <Child data={[]} {...props}/>
                    </Overlay>
                )
            }

            return (
                <Child data={data} {...props}/>
            )
        }

        return <CircularProgress/>
    }
}

export default withStreamSubscription