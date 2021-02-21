import React from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Menu as MuiMenu, MenuItem } from "@material-ui/core"

import { logout } from "../../features/auth/authSlice"

function Menu(props: React.ComponentProps<typeof MuiMenu>) {
    const history = useHistory()

    const dispatch = useDispatch()

    const redirect = (to: string) => () => {
        history.push(to)
        ;(props.onClose as Function)?.()
    }

    const handleLogout = () => {
        dispatch(logout())
        redirect("/")()
    }
    
    return (
        <MuiMenu {...props}>
            <MenuItem onClick={redirect("/dashboard")}>Guilds</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MuiMenu>
    )
}

export default Menu