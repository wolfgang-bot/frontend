import React, { useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { AppBar, Toolbar, Button, Grid, Divider, Container, Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RootState } from "../../store"
import { logout } from "../../features/auth/authSlice"
import DarkModeSwitch from "../../features/settings/DarkModeSwitch"
import Avatar from "../User/Avatar"
import Brand from "./Brand"
import { LayoutContext } from "./Layout"

const useStyles = makeStyles(theme => ({
    header: {
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "none",
        marginBottom: theme.spacing(2)
    },

    toolbar: theme.mixins.toolbar,

    spacingRight: {
        marginRight: theme.spacing(2)
    },

    avatar: {
        marginRight: theme.spacing(1)
    }
}))

function Header() {
    const context = useContext(LayoutContext)

    const classes = useStyles()

    const history = useHistory()

    const dispatch = useDispatch()

    const user = useSelector((store: RootState) => store.auth.data.user)
    const isLoggedIn = !!user

    const handleDashboardClick = () => {
        history.push("/dashboard")
    }

    const handleLogout = () => {
        dispatch(logout())
        history.push("/")
    }

    return (
        <AppBar className={classes.header} position="fixed">
            <Toolbar className={classes.toolbar}>
                <Container>
                    <Grid item container justify="space-between" wrap="nowrap">
                        <Box display="flex" alignItems="center">
                            <Link to="/">
                                <Brand/>
                            </Link>
                        </Box>

                        
                        <Box display="flex" alignItems="center">
                            {!isLoggedIn ? (
                                <Link to="/login">
                                    <Button variant="outlined">
                                        Login
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Button
                                        variant={
                                            context.isDashboard ? "text" : "outlined"
                                        }
                                        onClick={handleDashboardClick}
                                        className={classes.spacingRight}
                                    >
                                        {context.isDashboard ? "Guilds" : "Dashboard"}
                                    </Button>

                                    <Button
                                        onClick={handleLogout}
                                        variant="text"
                                        className={classes.spacingRight}
                                    >
                                        Logout
                                    </Button>
                                    
                                    <Avatar className={classes.avatar}/>

                                    <Typography variant="subtitle1">
                                        {user?.username}
                                    </Typography>
                                </>
                            )}

                            <Box ml={2}>
                                <DarkModeSwitch />
                            </Box>
                        </Box>
                    </Grid>
                </Container>
            </Toolbar>

            <Divider/>
        </AppBar>
    )
}

export default Header