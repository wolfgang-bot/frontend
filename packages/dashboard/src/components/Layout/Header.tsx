import React, { useContext, useState, useRef } from "react"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Button, Grid, Divider, Container, Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RootState } from "../../store"
import DarkModeSwitch from "../../features/settings/DarkModeSwitch"
import Avatar from "../User/Avatar"
import Brand from "./Brand"
import Menu from "./Menu"
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

    user: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center"
    },

    spacingRight: {
        marginRight: theme.spacing(3)
    },

    avatar: {
        marginRight: theme.spacing(1)
    }
}))

function Header() {
    const context = useContext(LayoutContext)

    const classes = useStyles()

    const menuAnchorRef = useRef<HTMLElement | null>(null)

    const user = useSelector((store: RootState) => store.auth.data.user)
    const isLoggedIn = !!user

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
        menuAnchorRef.current = event.currentTarget
        setIsMenuOpen(!isMenuOpen)
    }

    const handleMenuClose = () => {
        setIsMenuOpen(false)
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
                                    <Button
                                        variant="contained"
                                        className={classes.spacingRight}
                                        color="secondary"
                                    >
                                        Login
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    {!context.isDashboard && (
                                        <Link to="/dashboard">
                                            <Button
                                                variant="contained"
                                                className={classes.spacingRight}
                                                color="secondary"
                                            >
                                                Dashboard
                                            </Button>
                                        </Link>
                                    )}
                                    
                                    <div
                                        className={clsx(classes.user, classes.spacingRight)}
                                        onClick={handleUserClick}
                                    >
                                        <Avatar className={classes.avatar}/>

                                        <Typography variant="subtitle1">
                                            {user?.username}
                                        </Typography>
                                    </div>
                                </>
                            )}

                            <DarkModeSwitch />
                        </Box>
                    </Grid>
                </Container>
            </Toolbar>

            <Divider/>

            <Menu
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorEl={menuAnchorRef.current}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
            />
        </AppBar>
    )
}

export default Header
