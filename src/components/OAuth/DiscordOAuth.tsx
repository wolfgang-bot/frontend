import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

import { createListeners } from "../../utils"
import { API } from "../../config/types"
import { DISCORD_OAUTH_URL } from "../../config/constants"
import format, { FORMATS } from "../../api/format"
import { login } from "../../features/auth/authSlice"

function OAuthDiscord({ onClose }: { onClose: () => void }) {
    const dispatch = useDispatch()

    const popup = useRef<Window | null>()
    const removeCloseListener = useRef<() => void | null>()

    const addCloseListener = (popup: Window, callback: () => void) => {        
        const interval = setInterval(() => {
            if (popup.closed) {
                clearInterval(interval)
                callback()
            }
        }, 100)
        
        removeCloseListener.current = () => clearInterval(interval)
    }

    useEffect(() => {
        const width = 1000
        const height = 800

        const x = window.innerWidth / 2 - width / 2
        const y = window.innerHeight / 2 - height / 2

        popup.current = window.open(DISCORD_OAUTH_URL, "Login with Discord", `width=${width},height=${height},left=${x},top=${y}`)

        if (popup.current) {
            addCloseListener(popup.current, onClose)
        } else {
            onClose()
        }
    }, [])

    useEffect(() => {
        const handleMessage = (event: any) => {
            const { data: res }: { data: API.OAuthPopupResponse } = event

            if (!res) {
                throw new Error("Missing attribute 'data' in oauth response")
            }

            if (res?.source === "oauth" && popup.current) {
                removeCloseListener.current?.()
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

    return null
}

export default OAuthDiscord
