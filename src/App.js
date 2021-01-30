import React, { useState, useEffect } from "react"
import { CssBaseline, CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Router from "./router/index.js"
import login from "./features/auth/login.js"

const useStyles = makeStyles({
    "@global": {
        a: {
            textDecoration: "none"
        }
    }
})

function App() {
    useStyles()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        login().finally(() => setIsLoading(false))
    }, [])

    return (
        <>
            <CssBaseline/>
            { isLoading ? <CircularProgress /> : <Router />}
        </>
    )
}

export default App