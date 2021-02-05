import React, { useEffect, useRef, PropsWithChildren } from "react"
import { useDispatch } from "react-redux"
import { Button } from "@material-ui/core"

import { createListeners } from "../../utils"
import { API } from "../../config/types"
import { DISCORD_OAUTH_URL } from "../../config/constants"
import format, { FORMATS } from "../../api/format"
import { login } from "../../features/auth/authSlice"

function OAuthDiscord({ children }: PropsWithChildren<{}>) {
    const dispatch = useDispatch()

    const popup = useRef<Window | null>()

    const handleClick = () => {
        const width = 1000
        const height = 800

        const x = window.innerWidth / 2 - width / 2
        const y = window.innerHeight / 2 - height / 2

        popup.current = window.open(DISCORD_OAUTH_URL, "Login with Discord", `width=${width},height=${height},left=${x},top=${y}`)
    }

    useEffect(() => {
        const handleMessage = (event: any) => {
            const { data: res }: { data: API.OAuthPopupResponse } = event

            if (!res) {
                throw new Error("Missing attribute 'data' in oauth response")
            }

            if (res?.source === "oauth" && popup.current) {
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
        <Button variant="contained" onClick={handleClick}>{ children }</Button>
    )
}

export default OAuthDiscord