import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute"
import IndexPage from "../pages/IndexPage"
import LoginPage from "../pages/LoginPage"
import NotFoundPage from "../pages/NotFoundPage"
import ModulePage from "../pages/ModulePage"
import DashboardPage from "../pages/DashboardPage"

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute path="/dashboard">
                    <DashboardPage />
                </ProtectedRoute>

                <Route path="/login">
                    <LoginPage />
                </Route>

                <Route path="/module/:key">
                    <ModulePage />
                </Route>

                <Route exact path="/">
                    <IndexPage />
                </Route>

                <Route path="/not-found">
                    <NotFoundPage />
                </Route>

                <Route>
                    <Redirect to="/not-found" />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router