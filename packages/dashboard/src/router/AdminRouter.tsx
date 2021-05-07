import React from "react"
import { useSelector } from "react-redux"
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom"

import { LayoutContext } from "../components/Layout/Layout"
import AdminPage from "../pages/AdminPage"
import { RootState } from "../store"

function AdminRouter() {
    const { path } = useRouteMatch()

    const user = useSelector((store: RootState) => store.auth.data?.user)

    if (!user?.isBotAdmin) {
        return <Redirect to="/not-found"/>
    }

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
