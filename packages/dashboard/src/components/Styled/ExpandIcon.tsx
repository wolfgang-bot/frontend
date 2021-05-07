import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

const useStyles = makeStyles(theme => ({
    expandIcon: {
        transform: "rotate(90deg)",
        transition: theme.transitions.create("transform")
    },

    expandIconRotated: {
        transform: "rotate(-90deg)"
    }
}))

function ExpandIcon({ expanded }: { expanded: boolean }) {
    const classes = useStyles()

    return (
        <ChevronRightIcon
            className={clsx(
                classes.expandIcon,
                { [classes.expandIconRotated]: expanded }
            )}
        />
    )
}

export default ExpandIcon
