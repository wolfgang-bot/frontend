import React from "react"
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { theme } from "../../index"
import Header from "./Header.js"
import Sidebar from "../Sidebar/Sidebar"

type StyleProps = {
    center: boolean
}

const useStyles = makeStyles<typeof theme, StyleProps>(theme => ({
    layout: {
        display: "flex"
    },

    body: {
        width: `calc(100% - ${250}px)`,
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(8)
    },

    content: props => props.center && {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}))

function Layout({ headerProps = {}, sidebarProps = {}, children, center = false }) {
    const classes = useStyles({ center })

    return (
        <div className={classes.layout}>
            <Header {...headerProps}/>

            <Sidebar {...sidebarProps}/>

            <div className={classes.body}>
                <Container className={classes.content}>
                    { children }
                </Container>
            </div>
        </div>
    )
}

export default Layout