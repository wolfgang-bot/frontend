import React from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Menu as MuiMenu, MenuItem } from "@material-ui/core"

import { logout } from "../../features/auth/authSlice"
import { RootState } from "../../store"

function Menu(props: React.ComponentProps<typeof MuiMenu>) {
    const history = useHistory()

    const dispatch = useDispatch()

    const isBotAdmin = useSelector((store: RootState) => store.auth.data?.user?.isBotAdmin)

    const redirect = (to: string) => () => {
        history.push(to)
        ;(props.onClose as Function)?.()
    }

    const handleLogout = () => {
        dispatch(logout())
        window.location.pathname = "/"
    }
    
    return (
        <MuiMenu {...props}>
            <MenuItem onClick={redirect("/guild")}>Guilds</MenuItem>
            {isBotAdmin && (
                <MenuItem onClick={redirect("/admin")}>Admin</MenuItem>
            )}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MuiMenu>
    )
}

export default Menu
