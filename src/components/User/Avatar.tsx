import React from "react"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { Avatar as MuiAvatar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RootState } from "../../store"

const useStyles = makeStyles({
    avatar: {
        width: 32,
        height: 32
    }
})

function Avatar({ className, onClick }: {
    className: string,
    onClick?: (...args: any[]) => void
}) {
    const classes = useStyles()

    const user = useSelector((store: RootState) => store.auth.data.user)

    return (
        <MuiAvatar
            className={clsx(classes.avatar, className)}
            onClick={onClick}
            src={user?.avatar}
        />
    )
}

export default Avatar