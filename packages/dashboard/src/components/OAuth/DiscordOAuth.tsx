import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"

import { createListeners } from "../../utils"
import { API } from "../../config/types"
import { DISCORD_OAUTH_URL } from "../../config/constants"
import format, { FORMATS } from "../../api/format"
import { login } from "../../features/auth/authSlice"
import { Button } from "@material-ui/core"

import discordIcon from "../../assets/images/discord-brand.svg"

const useStyles = makeStyles(theme => ({
    discordOAuth: {
        fontSize: theme.typography.subtitle1.fontSize
    },

    icon: {
        width: 20
    }
}))

function OAuthDiscord({ onCancel }: { onCancel: () => void }) {
    const dispatch = useDispatch()

    const classes = useStyles()

    const popup = useRef<Window | null>()
    const removeCancelListener = useRef<() => void | null>()

    const addCloseListener = (popup: Window, callback: () => void) => {        
        const interval = setInterval(() => {
            if (popup.closed) {
                clearInterval(interval)
                callback()
            }
        }, 100)
        
        removeCancelListener.current = () => clearInterval(interval)
    }

    const openPopup = () => {
        const width = 1000
        const height = 800

        const x = window.innerWidth / 2 - width / 2
        const y = window.innerHeight / 2 - height / 2

        popup.current = window.open(DISCORD_OAUTH_URL, "Login with Discord", `width=${width},height=${height},left=${x},top=${y}`)

        if (popup.current) {
            addCloseListener(popup.current, onCancel)
        } else {
            onCancel()
        }
    }

    // eslint-disable-next-line
    useEffect(openPopup, [])

    useEffect(() => {
        const handleMessage = (event: any) => {
            const { data: res }: { data: API.OAuthPopupResponse } = event

            if (!res) {
                throw new Error("Missing attribute 'data' in oauth response")
            }

            if (res?.source === "oauth" && popup.current) {
                removeCancelListener.current?.()
                popup.current.close()

                if (res.status === "ok") {
                    if (!res.data) {
                        throw new Error("Missing attribute 'data.data' in oauth response")
                    }

                    format(FORMATS.USER)({ data: res.data.user })

                    dispatch(login({
                        user: res.data.user,
                        token: res.data.token
                    }))
                }
            }
        }

        return createListeners(window, [
            ["message", handleMessage]
        ])
    })

    return (
        <Button
            variant="outlined"
            onClick={openPopup}
            className={classes.discordOAuth}
            startIcon={
                <img
                    src={discordIcon} 
                    alt="Discord"
                    className={classes.icon}
                />
            }
        >
            Login with Discord
        </Button>
    )
}

export default OAuthDiscord
