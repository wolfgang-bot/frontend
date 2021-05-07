import React from "react"
import { useSelector } from "react-redux"
import { Redirect, useLocation, Route } from "react-router-dom"

import { RootState } from "../store"

type Props = React.PropsWithChildren<React.ComponentProps<typeof Route>>

function ProtectedRoute({ children, ...props }: Props) {
    const location = useLocation()

    const isLoggedIn = useSelector((store: RootState) => !!store.auth.data.user)

    if (!isLoggedIn) {
        return <Redirect to={`/login?redirect_to=${encodeURIComponent(location.pathname)}`}/>
    }

    return (
        <Route {...props}>
            { children }
        </Route>
    )
}

export default ProtectedRoute