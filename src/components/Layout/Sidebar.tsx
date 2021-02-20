import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Drawer, Divider, Typography, List } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RootState } from "../../store"
import GuildList from "../../features/guilds/GuildList"

const useStyles = makeStyles(theme => {
    const width = 250

    return {
        sidebar: {
            width,
            flexShrink: 0
        },

        paper: {
            width
        },

        toolbar: {
            ...theme.mixins.toolbar,
            marginLeft: theme.spacing(3),
            display: "flex",
            alignItems: "center"
        },

        nav: {
            marginTop: theme.spacing(2)
        }
    }
})

function Sidebar({ activeGuildId }: { activeGuildId?: string }) {
    const classes = useStyles()

    const isLoggedIn = useSelector((store: RootState) => !!store.auth.data.user)

    return (
        <Drawer
            variant="permanent"
            className={classes.sidebar}
            classes={{
                paper: classes.paper
            }}
        >
            <div className={classes.toolbar}>
                <Link to="/">
                    <Typography color="textPrimary" variant="h6">Javascript Bot</Typography>
                </Link>
            </div>

            <Divider/>

            <List className={classes.nav}>
                { isLoggedIn && <GuildList activeGuildId={activeGuildId}/> }
            </List>
        </Drawer>
    )
}

export default Sidebar