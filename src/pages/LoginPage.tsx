import React from "react"
import { Redirect, useLocation } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"

import Layout from "../components/Layout/Layout"
import DiscordOAuth from "../components/OAuth/DiscordOAuth"
import useLogin from "../utils/useLogin"

const DEFAULT_REDIRECT = "/dashboard"

function LoginPage() {
    const location = useLocation()

    const status = useLogin()

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