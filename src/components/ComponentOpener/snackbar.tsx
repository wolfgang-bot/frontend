import React from "react"
import { Snackbar, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/Close"

import ComponentHandle from "./ComponentHandle"

class SnackbarHandle extends ComponentHandle<
    typeof Snackbar,
    React.ComponentProps<typeof Snackbar>
> {}

const useStyles = makeStyles(theme => ({
    closeButton: {
        color: theme.palette.primary.main
    }
}))

function CloseButton({ onClose }: {
    onClose: (...args: any) => void
}) {
    const classes = useStyles()

    return (
        <IconButton onClick={onClose} className={classes.closeButton}>
            <CloseIcon />
        </IconButton>
    )
}

function createOpener(open: (handle: SnackbarHandle) => SnackbarHandle) {
    return function openSnackbar(message: string) {
        const handle = new SnackbarHandle({
            component: Snackbar,
            data: {
                message,
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
                autoHideDuration: 3000
            }
        })

        handle.setData({
            action: <CloseButton onClose={() => handle.dispatchEvent("close")} />
        })

        return open(handle)
    }
}

export default createOpener