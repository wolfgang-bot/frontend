import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute"
import IndexPage from "../pages/IndexPage"
import LoginPage from "../pages/LoginPage"
import GuildPage from "../pages/GuildPage"
import NotFoundPage from "../pages/NotFoundPage"

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute path="/guild/:id">
                    <GuildPage/>
                </ProtectedRoute>

                <Route path="/login">
                    <LoginPage/>
                </Route>

                <Route exact path="/">
                    <IndexPage/>
                </Route>

                <Route path="/not-found">
                    <NotFoundPage/>
                </Route>

                <Route>
                    <Redirect to="/not-found"/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router