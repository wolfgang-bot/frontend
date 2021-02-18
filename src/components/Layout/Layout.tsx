import React from "react"
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { theme } from "../../index"
import Header from "./Header"
import Sidebar from "./Sidebar"
import ComponentOpener from "../ComponentOpener/ComponentOpener"

type StyleProps = {
    center?: boolean,
    renderSidebar?: boolean
}

type Props = React.PropsWithChildren<{
    sidebarProps?: React.ComponentProps<typeof Sidebar>,
    center?: boolean,
    renderSidebar?: boolean
}>

const useStyles = makeStyles<typeof theme, StyleProps>(theme => ({
    layout: {
        display: "flex"
    },

    body: props => ({
        width: props.renderSidebar ? `calc(100% - ${250}px)` : "100%",
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(8)
    }),

    content: props => props.center ? {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    } : {}
}))

function Layout({
    renderSidebar = false,
    sidebarProps = {},
    center = false,
    children
}: Props) {
    const classes = useStyles({ center, renderSidebar })

    return (
        <div className={classes.layout}>
            <Header renderSidebar={renderSidebar}/>

            {renderSidebar && <Sidebar {...sidebarProps} />}

            <div className={classes.body}>
                <Container className={classes.content}>
                    { children as React.ReactChildren }
                </Container>
            </div>

            <ComponentOpener/>
        </div>
    )
}

export default Layout