import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"

import { LayoutContext } from "../components/Layout/Layout"
import GuildSelectionPage from "../pages/GuildSelectionPage"
import DashboardPage from "../pages/DashboardPage"
import ModulePage from "../pages/ModulePage"

function DashboardRouter() {
    const { path } = useRouteMatch()

    return (
        <LayoutContext.Provider value={{
            isDashboard: true
        }}>
            <Switch>
                <Route exact path={path}>
                    <GuildSelectionPage />
                </Route>

                <Route path={`${path}/:guildId/module/:key`}>
                    <ModulePage />
                </Route>

                <Route path={`${path}/:guildId`}>
                    <DashboardPage />
                </Route>
            </Switch>
        </LayoutContext.Provider>
    )
}

export default DashboardRouter
