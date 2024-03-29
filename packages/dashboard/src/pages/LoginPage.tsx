import React from "react"
import { Redirect, useLocation } from "react-router-dom"
import { CircularProgress, Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout"
import DiscordOAuth from "../components/OAuth/DiscordOAuth"
import useLogin from "../utils/useLogin"
import opener from "../components/ComponentOpener"

const DEFAULT_REDIRECT = "/guild"

const useStyles = makeStyles({
    loginText: {
        opacity: .87
    }
})

function LoginPage() {
    const location = useLocation()

    const classes = useStyles()

    const status = useLogin()

    const handleOAuthCancel = () => {
        opener.openSnackbar("Popup closed")
    }

    let child = (
        <>
            <Box mb={2}>
                <CircularProgress />
            </Box>

            <Typography
                variant="body1"
                className={classes.loginText}
            >
                Logging in...
            </Typography>
        </>
    )

    if (status === "success") {
        const redirect = new URLSearchParams(location.search).get("redirect_to")
        return <Redirect to={redirect || DEFAULT_REDIRECT}/>
    }

    if (status === "idle") {
        child = (
            <DiscordOAuth onCancel={handleOAuthCancel}/>
        )
    }

    return (
        <Layout center>
            {child}
        </Layout>
    )
}

export default LoginPage
