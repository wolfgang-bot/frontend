import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CssBaseline, CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RootState } from "./store"
import Router from "./router"
import { init } from "./features/auth/authSlice"
import { API_TOKEN_STORAGE_KEY } from "./config/constants"

const useStyles = makeStyles({
    "@global": {
        a: {
            textDecoration: "none"
        }
    }
})

function App() {
    useStyles()

    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.auth.status)

    useEffect(() => {
        if (status === "idle") {
            const token = localStorage.getItem(API_TOKEN_STORAGE_KEY)
            dispatch(init({ token }))
        }
    }, [status])

    return (
        <>
            <CssBaseline/>
            { status === "pending" ? <CircularProgress /> : <Router />}
        </>
    )
}

export default App