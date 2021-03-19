import React, { ForwardedRef, useEffect, useMemo, useImperativeHandle } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CircularProgress, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { API } from "../../config/types"
import { subscribe, pause, resume, makeStreamStatusSelector, makeStreamDataSelector } from "./streamsSlice"

export type SubscriptionOptions = {
    showOverlayIfEmpty?: boolean,
    renderProgressWhileLoading?: boolean,
    useAutomatedStreamPausing?: boolean
}

export type RefHandle = {
    pauseStream: () => void
}

const useStyles = makeStyles(theme => ({
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
        backgroundColor: theme.palette.type === "dark" ?
            "rgba(0, 0, 0, .35)" :
            "rgba(255, 255, 255, .67)",
        zIndex: 1
    }    
}))

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
    hocOptions?: SubscriptionOptions
) {
    type Props = React.ComponentProps<typeof Child> & SubscriptionOptions

    function StreamWrapper(props: Props, ref: ForwardedRef<RefHandle>) {
        const options = {
            ...hocOptions,
            ...props
        }

        const streamArgs = useMemo<API.StreamArgs>(() => ({
            eventStream: stream,
            guildId: props.guild?.id
        }), [props.guild?.id])

        const dispatch = useDispatch()

        const status = useSelector(makeStreamStatusSelector(streamArgs))
        const data = useSelector(makeStreamDataSelector(streamArgs))

        useEffect(() => {
            if (status === "idle") {
                dispatch(subscribe(streamArgs))
            } else if (status === "paused") {
                dispatch(resume(streamArgs))
            }
        }, [streamArgs, status, dispatch])

        useEffect(() => {
            if (options.useAutomatedStreamPausing === false) {
                return
            }

            return () => {
                dispatch(pause(streamArgs))
            }
        }, [options.useAutomatedStreamPausing, streamArgs, dispatch])

        useImperativeHandle(ref, () => ({
            pauseStream: () => {
                dispatch(pause(streamArgs))
            }
        }), [dispatch, streamArgs])

        const isLoading = status === "idle" || status === "pending"

        if (options?.renderProgressWhileLoading !== false && isLoading) {
            return <CircularProgress />
        }

        if (!data || (data.length === 0 && options?.showOverlayIfEmpty !== false)) {
            return (
                <Overlay
                    overlay={(
                        <Typography variant="h6">No data available</Typography>
                    )}
                >
                    <Child data={[]} isLoading={false} {...props} />
                </Overlay>
            )
        }

        return (
            <Child data={data} isLoading={isLoading} {...props} />
        )
    }

    return React.forwardRef<RefHandle, Props>(StreamWrapper)
}

export default withStreamSubscription
