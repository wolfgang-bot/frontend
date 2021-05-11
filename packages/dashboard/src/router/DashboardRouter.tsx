import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"

import GuildSelectionPage from "../pages/GuildSelectionPage"
import DashboardPage from "../pages/DashboardPage"

function DashboardRouter() {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route exact path={path}>
                <GuildSelectionPage />
            </Route>

            <Route path={`${path}/:guildId`}>
                <DashboardPage />
            </Route>
        </Switch>
    )
}

export default DashboardRouter
