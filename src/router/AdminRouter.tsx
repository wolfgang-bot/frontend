import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"

import { LayoutContext } from "../components/Layout/Layout"
import AdminPage from "../pages/AdminPage"

function AdminRouter() {
    const { path } = useRouteMatch()

    return (
        <LayoutContext.Provider value={{
            isDashboard: true
        }}>
            <Switch>
                <Route exact path={path}>
                    <AdminPage />
                </Route>
            </Switch>
        </LayoutContext.Provider>
    )
}

export default AdminRouter
