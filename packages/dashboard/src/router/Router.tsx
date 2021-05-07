import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import { LayoutContext } from "../components/Layout/Layout"
import DashboardRouter from "./DashboardRouter"
import AdminRouter from "./AdminRouter"
import ProtectedRoute from "./ProtectedRoute"
import IndexPage from "../pages/IndexPage"
import LoginPage from "../pages/LoginPage"
import NotFoundPage from "../pages/NotFoundPage"
import ModulePage from "../pages/ModulePage"
import ErrorBoundary from "../ErrorBoundary"

function Router() {
    return (
        <LayoutContext.Provider value={{
            isDashboard: false
        }}>
            <BrowserRouter basename="/dashboard">
                <ErrorBoundary>
                    <Switch>
                        <ProtectedRoute path="/dashboard">
                            <DashboardRouter />
                        </ProtectedRoute>

                        <ProtectedRoute path="/admin">
                            <AdminRouter />
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
                </ErrorBoundary>
            </BrowserRouter>
        </LayoutContext.Provider>
    )
}

export default Router
