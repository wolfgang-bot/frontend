import React, { useState, useRef } from "react"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
    AppBar,
    Toolbar,
    Button,
    Grid,
    Divider,
    Container,
    Box,
    Typography,
    useMediaQuery
} from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"

import { RootState } from "../../store"
import DarkModeSwitch from "../../features/settings/DarkModeSwitch"
import Avatar from "../User/Avatar"
import Brand from "./Brand"
import Menu from "./Menu"

const useStyles = makeStyles(theme => ({
    header: {
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "none"
    },

    toolbar: theme.mixins.toolbar,

    user: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center"
    },

    spacingRight: {
        marginRight: theme.spacing(3),

        [theme.breakpoints.down("sm")]: {
            marginRight: theme.spacing(1)
        }
    },

    avatar: {
        marginRight: theme.spacing(1)
    }
}))

function Header() {
    const classes = useStyles()

    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"))

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
                            <a href="/">
                                <Brand/>
                            </a>
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
                                <div
                                    className={clsx(classes.user, classes.spacingRight)}
                                    onClick={handleUserClick}
                                >
                                    <Avatar className={classes.avatar}/>

                                    {!isSmallScreen && (
                                        <Typography variant="subtitle1">
                                            {user?.username}
                                        </Typography>
                                    )}
                                </div>
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
                    horizontal: isSmallScreen ? "right" : "left"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: isSmallScreen ? "right" : "left"
                }}
            />
        </AppBar>
    )
}

export default Header
