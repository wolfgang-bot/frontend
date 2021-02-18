import React from "react"
import { CssBaseline } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Router from "./router"

const useStyles = makeStyles({
    "@global": {
        a: {
            textDecoration: "none"
        }
    }
})

function App() {
    useStyles()

    return (
        <>
            <CssBaseline/>
            <Router/>
        </>
    )
}

export default App