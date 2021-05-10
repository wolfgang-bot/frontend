import React from "react"
import { Container, Divider, Theme } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "./Header"
import ComponentOpener from "../ComponentOpener/ComponentOpener"

type StyleProps = {
    center?: boolean
}

type Props = React.PropsWithChildren<{
    center?: boolean,
    navbar?: React.ReactElement
}>

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    layout: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },

    navbar: {
        backgroundColor: theme.palette.background.paper
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
    navbar,
    children
}: Props) {
    const classes = useStyles({ center })

    return (
        <div className={classes.layout}>
            <Header/>

            {navbar && (
                <div className={classes.navbar}>
                    <Container>
                        {navbar}
                    </Container>

                    <Divider/>
                </div>
            )}

            <Container className={classes.body}>
                { children || <React.Fragment/> }
            </Container>

            <ComponentOpener/>
        </div>
    )
}

export default Layout
