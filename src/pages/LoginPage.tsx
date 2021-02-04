import React from "react"
import { useSelector } from "react-redux"
import { Redirect, useLocation } from "react-router-dom"

import { RootState } from "../store"
import Layout from "../components/Layout/Layout"
import DiscordOAuth from "../components/OAuth/DiscordOAuth"

function LoginPage() {
    const location = useLocation()

    const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn)

    if (isLoggedIn) {
        const redirect = new URLSearchParams(location.search).get("redirect_to")
        return <Redirect to={redirect || "/"}/>
    }

    return (
        <Layout center>
            <DiscordOAuth>Log in with discord</DiscordOAuth>
        </Layout>
    )
}

export default LoginPage