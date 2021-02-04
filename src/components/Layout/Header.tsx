import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { AppBar, Toolbar, Button, Grid, Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RootState } from "../../store"
import DiscordOAuth from "../OAuth/DiscordOAuth"
import Avatar from "../User/Avatar"

const useStyles = makeStyles(theme => ({
    header: {
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.background.default,
        boxShadow: "none",
        marginBottom: theme.spacing(2),
        width: `calc(100% - ${250}px)`
    },

    toolbar: theme.mixins.toolbar,

    user: {
        display: "flex",
        alignContent: "center"
    },

    spacingRight: {
        marginRight: theme.spacing(2)
    }
}))

function Header() {
    const classes = useStyles()

    const history = useHistory()

    const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn)

    const handleLogout = () => {
        console.log("Logout")
        history.push("/")
    }

    return (
        <AppBar className={classes.header} position="fixed">
            <Toolbar className={classes.toolbar}>
                <Grid item xs></Grid>

                <Grid item>
                    { !isLoggedIn ? (
                        <DiscordOAuth>Login</DiscordOAuth>
                    ) : (
                        <div className={classes.user}>
                            <Button onClick={handleLogout} variant="text" className={classes.spacingRight}>Logout</Button>

                            <Avatar/>
                        </div>
                    ) }
                </Grid>
            </Toolbar>

            <Divider/>
        </AppBar>
    )
}

export default Header