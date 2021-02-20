import React from "react"
import clsx from "clsx"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { Avatar as MuiAvatar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { theme } from "../../index"
import { RootState } from "../../store"

type StyleProps = {
    clickable?: boolean,
    size?: number
}

const useStyles = makeStyles<typeof theme, StyleProps>({
    avatar: props => ({
        cursor: props.clickable ? "pointer" : "",
        width: props.size,
        height: props.size
    })
})

function Avatar({ size, clickable = true, ...props }: {
    size?: number,
    clickable?: boolean
} & React.ComponentProps<typeof MuiAvatar>) {
    const classes = useStyles({ size, clickable })

    const history = useHistory()

    const user = useSelector((store: RootState) => store.auth.data.user)

    const handleClick = () => {
        history.push("/")
    }

    return (
        <MuiAvatar
            className={clsx(classes.avatar, props.className)}
            onClick={handleClick}
            src={user?.avatar}
        />
    )
}

export default Avatar