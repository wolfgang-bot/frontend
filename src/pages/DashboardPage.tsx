import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"

import Layout from "../components/Layout/Layout"
import GuildPage from "./GuildPage"
import ModulePage from "./ModulePage"

function DashboardPage() {
    return (
        <Layout>
            Dashboard
        </Layout>
    )
}

function DashboardRouter() {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route exact path={path}>
                <DashboardPage/>
            </Route>

            <Route path={`${path}/:guildId/module/:key`}>
                <ModulePage/>
            </Route>

            <Route path={`${path}/:guildId`}>
                <GuildPage/>
            </Route>
        </Switch>
    )
}

export default DashboardRouter