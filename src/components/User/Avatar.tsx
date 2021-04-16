import React from "react"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { Avatar as MuiAvatar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RootState } from "../../store"
import { API } from "../../config/types"

const useStyles = makeStyles({
    avatar: {
        width: 32,
        height: 32
    }
})

function Avatar({ className, onClick, user }: {
    className?: string,
    onClick?: (...args: any[]) => void,
    user?: API.User
}) {
    const classes = useStyles()

    const authUser = useSelector((store: RootState) => store.auth.data.user)

    const displayUser = user || authUser

    return (
        <MuiAvatar
            className={clsx(classes.avatar, className)}
            onClick={onClick}
            src={displayUser?.avatar}
        />
    )
}

export default Avatar