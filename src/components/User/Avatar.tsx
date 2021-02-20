import React from "react"
import clsx from "clsx"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { Avatar as MuiAvatar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RootState } from "../../store"

const useStyles = makeStyles({
    avatar: {
        cursor: "pointer",
        width: 32,
        height: 32
    }
})

function Avatar({ className }: {
    className: string
}) {
    const classes = useStyles()

    const history = useHistory()

    const user = useSelector((store: RootState) => store.auth.data.user)

    const handleClick = () => {
        history.push("/")
    }

    return (
        <MuiAvatar
            className={clsx(classes.avatar, className)}
            onClick={handleClick}
            src={user?.avatar}
        />
    )
}

export default Avatar