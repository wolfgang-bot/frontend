import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import DashboardRouter from "./DashboardRouter"
import AdminRouter from "./AdminRouter"
import ProtectedRoute from "./ProtectedRoute"
import LoginPage from "../pages/LoginPage"
import NotFoundPage from "../pages/NotFoundPage"
import ErrorBoundary from "../ErrorBoundary"

function Router() {
    return (
        <BrowserRouter basename="/dashboard">
            <ErrorBoundary>
                <Switch>
                    <ProtectedRoute path="/guild">
                        <DashboardRouter />
                    </ProtectedRoute>

                    <ProtectedRoute path="/admin">
                        <AdminRouter />
                    </ProtectedRoute>

                    <Route path="/login">
                        <LoginPage />
                    </Route>

                    <Route exact path="/">
                        <Redirect to="/guild" />
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
    )
}

export default Router
