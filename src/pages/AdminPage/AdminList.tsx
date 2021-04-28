import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Box,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core"
import RemoveIcon from "@material-ui/icons/Close"

import { RootState } from "../../store"
import { fetchAdmins, removeAdmin } from "../../features/users/usersSlice"
import Avatar from "../../components/User/Avatar"
import { API } from "../../config/types"
import opener from "../../components/ComponentOpener"

function AdminList() {
    const dispatch = useDispatch()
    
    const admins = useSelector((store: RootState) => store.users.admins.data)
    const status = useSelector((store: RootState) => store.users.admins.status)
    const error = useSelector((store: RootState) => store.users.admins.error)

    const authUser = useSelector((store: RootState) => store.auth.data.user)

    const handleRemoveAdmin = (admin: API.Admin) => {
        const dialogHandle = opener.openDialog("ConfirmDialog", {
            content: `Admin priviliges will be revoked from user '${admin.user?.username}'`
        })

        dialogHandle.addEventListener("close", (accepted: boolean) => {
            if (accepted) {
                dispatch(removeAdmin(admin))
            }
        })
    }

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchAdmins())
        }
    }, [status, dispatch])

    if (status === "error") {
        return <div>{error}</div>
    }

    if (status === "success") {
        return (
            <List>
                {Object.values(admins).map(admin => (
                    <ListItem key={admin.id}>
                        {admin.user && (
                            <>
                                <Box mr={2}>
                                    <Avatar user={admin.user}/>
                                </Box>
                                <ListItemText primary={admin.user.username}/>
                            </>
                        )}

                        {authUser && admin.user_id === authUser.id
                            ? null
                            : (
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleRemoveAdmin(admin)}
                                    >
                                        <RemoveIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            )
                        }
                    </ListItem>
                ))}
            </List>
        )
    }

    return <CircularProgress/>
}

export default AdminList
