import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { AppBar, Toolbar, Button, Grid, Divider, Typography, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { theme } from "../../index"
import { RootState } from "../../store"
import Avatar from "../User/Avatar"
import { logout } from "../../features/auth/authSlice"

type StyleProps = {
    renderSidebar?: boolean
}

const useStyles = makeStyles<typeof theme, StyleProps>(theme => ({
    header: props => ({
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.background.default,
        boxShadow: "none",
        marginBottom: theme.spacing(2),
        width: props.renderSidebar ? `calc(100% - ${250}px)` : ''
    }),

    toolbar: theme.mixins.toolbar,

    spacingRight: {
        marginRight: theme.spacing(1)
    }
}))

function Header({ renderSidebar }: { renderSidebar?: boolean }) {
    const classes = useStyles({ renderSidebar })

    const history = useHistory()

    const dispatch = useDispatch()

    const isLoggedIn = useSelector((store: RootState) => !!store.auth.data.user)

    const handleLogin = () => {
        history.push("/dashboard")
    }

    const handleLogout = () => {
        dispatch(logout())
        history.push("/")
    }

    return (
        <AppBar className={classes.header} position="fixed">
            <Toolbar className={classes.toolbar}>
                <Grid item container justify="space-between" wrap="nowrap">
                    <Box>
                        {!renderSidebar && (
                            <Link to="/">
                                <Typography color="textPrimary" variant="h6">
                                    Javascript Bot
                                </Typography>
                            </Link>
                        )}
                    </Box>

                    <Box display="flex">
                        <Button
                            variant="contained"
                            onClick={handleLogin}
                            className={classes.spacingRight}
                        >
                            Dashboard
                        </Button>

                        {isLoggedIn && (
                            <>
                                <Button
                                    onClick={handleLogout}
                                    variant="text"
                                    className={classes.spacingRight}
                                >
                                    Logout
                                </Button>
                                <Avatar/>
                            </>
                        )}
                    </Box>
                </Grid>
            </Toolbar>

            <Divider/>
        </AppBar>
    )
}

export default Header