import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    title: {
        margin: `${theme.spacing(4)}px 0`
    }
}))

function Title(props: React.PropsWithChildren<any>) {
    const classes = useStyles()

    return (
        <Typography variant="h5" className={classes.title}>
            {props.children}
        </Typography>
    )
}

export default Title