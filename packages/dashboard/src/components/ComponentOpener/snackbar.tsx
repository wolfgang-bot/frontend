import React from "react"
import { Snackbar, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/Close"

import ComponentHandle from "./ComponentHandle"

type SnackbarTypes = "info" | "error"

class SnackbarHandle extends ComponentHandle<
    typeof CustomSnackbar,
    React.ComponentProps<typeof CustomSnackbar>
> {}

const useStyles = makeStyles(theme => ({
    "snackbar-info": {

    },

    "close-button-info": {
        color: theme.palette.primary.main
    },

    "snackbar-error": {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.common.white
    },

    "close-button-error": {
        color: theme.palette.common.white
    }
}))

function CustomSnackbar({ type = "info", ...props }: {
    type?: SnackbarTypes,
} & React.ComponentProps<typeof Snackbar>) {
    const classes = useStyles({ type })

    const snackbarClassName = ("snackbar-" + type) as keyof typeof classes
    const closeButtonClassName = ("close-button-" + type) as keyof typeof classes

    if (!classes[snackbarClassName] || !classes[closeButtonClassName]) {
        throw new Error(`Missing class for type '${type}'`)
    }

    return (
        <Snackbar
            ContentProps={{
                className: classes[snackbarClassName]
            }}
            action={
                <IconButton
                    onClick={props.onClose as any}
                    className={classes[closeButtonClassName]}
                >
                    <CloseIcon />
                </IconButton>
            }
            {...props}
        />
    )
}

function createOpener(open: (handle: SnackbarHandle) => SnackbarHandle) {
    return function openSnackbar(message: string, type: SnackbarTypes = "info") {
        const handle = new SnackbarHandle({
            component: CustomSnackbar,
            data: {
                message,
                type,
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
                autoHideDuration: 3000
            }
        })

        handle.setData({
            onClose: () => handle.dispatchEvent("close")
        })

        return open(handle)
    }
}

export default createOpener