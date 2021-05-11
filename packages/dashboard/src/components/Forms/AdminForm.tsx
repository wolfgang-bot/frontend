import { Box, TextField, IconButton } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import AddIcon from "@material-ui/icons/Add"

import { createAdmin as createAdminAction } from "../../features/users/usersSlice"
import opener from "../ComponentOpener"

function AdminForm() {
    const dispatch = useDispatch()
    
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (args: { userId: string }) => {
        if (!args.userId) {
            return
        }

        const dialogHandle = opener.openDialog("ConfirmDialog", {
            content: `Admin priviliges will be granted to the user '${
                args.userId
            }'`
        })

        dialogHandle.addEventListener("close", (accepted: boolean) => {
            if (accepted) {
                dispatch(createAdminAction(args))
                reset()
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                display="flex"
                justifyContent="space-between"
            >
                <TextField
                    inputRef={register()}
                    fullWidth
                    name="userId"
                    label="User ID"
                />

                <Box ml={2}>
                    <IconButton
                        edge="end"
                        type="submit"
                    >
                        <AddIcon/>
                    </IconButton>
                </Box>
            </Box>
        </form>
    )
}

export default AdminForm
