import React, { useEffect, useRef, ReactChildren } from "react"
import { Button } from "@material-ui/core"

import { createListeners } from "../../utils"
import { API } from "../../config/types"
import { DISCORD_OAUTH_URL } from "../../config/constants"
import format, { FORMATS } from "../../api/format"

function OAuthDiscord({ children }: {
    children: ReactChildren
}) {
    const popup = useRef<Window>()

    const handleClick = () => {
        const width = 1000
        const height = 800

        const x = window.innerWidth / 2 - width / 2
        const y = window.innerHeight / 2 - height / 2

        popup.current = window.open(DISCORD_OAUTH_URL, "Login with Discord", `width=${width},height=${height},left=${x},top=${y}`)
    }

    useEffect(() => {
        const handleMessage = (event: { data: API.OAuthPopupResponse }) => {
            const { data: res } = event
            if (res?.source === "oauth" && popup.current) {
                popup.current.close()

                if (res.status === "ok") {
                    format(FORMATS.USER)({ data: res.data.user })

                    // dispatch(login({
                    //     user: res.data.user,
                    //     token: res.data.token
                    // }))
                    console.log("OAuth", res)
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