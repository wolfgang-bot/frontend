import React from "react"
import { Button, CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    loadingButton: {
        position: "relative",
        display: "inline-block"
    },

    loader: {
        position: "absolute",
        top: "50%", left: "50%",
        margin: "-12px 0 0 -12px"
    },
})

type Props = {
    isLoading: boolean
} & React.ComponentProps<typeof Button>

function LoadingButton({ isLoading, children, ...props }: React.PropsWithChildren<Props>) {
    const classes = useStyles()

    return (
        <div className={classes.loadingButton}>
            <Button disabled={isLoading} {...props}>
                {children}
            </Button>

            {isLoading && <CircularProgress size={24} className={classes.loader} />}
        </div>
    )
}

export default LoadingButton