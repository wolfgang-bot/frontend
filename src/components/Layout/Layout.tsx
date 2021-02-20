import React from "react"
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { theme } from "../../index"
import Header from "./Header"
import ComponentOpener from "../ComponentOpener/ComponentOpener"

type StyleProps = {
    center?: boolean
}

type Props = React.PropsWithChildren<{
    center?: boolean
}>

const useStyles = makeStyles<typeof theme, StyleProps>(theme => ({
    layout: {
        display: "flex",
        paddingTop: theme.spacing(8)
    },
    
    body: props => props.center ? {
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    } : {}
}))

function Layout({
    center = false,
    children
}: Props) {
    const classes = useStyles({ center })

    return (
        <div className={classes.layout}>
            <Header/>

            <Container className={classes.body}>
                { children || <React.Fragment/> }
            </Container>

            <ComponentOpener/>
        </div>
    )
}

export default Layout