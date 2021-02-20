import React from "react"
import { Container, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { theme } from "../../index"
import Header from "./Header"
import ComponentOpener from "../ComponentOpener/ComponentOpener"

type StyleProps = {
    center?: boolean
}

type Props = React.PropsWithChildren<{
    center?: boolean,
    navbar?: React.ReactElement
}>

const useStyles = makeStyles<typeof theme, StyleProps>(theme => ({
    layout: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    
    body: props => props.center ? {
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    } : {}
}))

export const LayoutContext = React.createContext({
    isDashboard: false
})

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
                <Paper variant="outlined" square>
                    <Container>
                        {navbar}
                    </Container>
                </Paper>
            )}

            <Container className={classes.body}>
                { children || <React.Fragment/> }
            </Container>

            <ComponentOpener/>
        </div>
    )
}

export default Layout