import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Redirect, useLocation } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"

import { RootState } from "../store"
import Layout from "../components/Layout/Layout"
import DiscordOAuth from "../components/OAuth/DiscordOAuth"
import { API_TOKEN } from "../config/constants"
import { initAPI } from "../features/auth/authSlice"

const DEFAULT_REDIRECT = "/dashboard"

function LoginPage() {
    const location = useLocation()
    
    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.auth.status)

    useEffect(() => {
        if (API_TOKEN && status === "idle") {
            dispatch(initAPI({
                token: API_TOKEN
            }))
        }
    }, [status, dispatch])

    let child = <CircularProgress/>

    if (status === "success") {
        const redirect = new URLSearchParams(location.search).get("redirect_to")
        return <Redirect to={redirect || DEFAULT_REDIRECT}/>
    }

    if (status === "idle") {
        child = (
            <DiscordOAuth>Log in with discord</DiscordOAuth>
        )
    }

    return (
        <Layout center>
            {child}
        </Layout>
    )
}

export default LoginPage