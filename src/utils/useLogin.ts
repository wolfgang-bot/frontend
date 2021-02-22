import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { RootState } from "../store"
import { API_TOKEN } from "../config/constants"
import { initAPI } from "../features/auth/authSlice"

function useLogin() {
    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.auth.status)

    useEffect(() => {
        if (API_TOKEN && status === "idle") {
            dispatch(initAPI({
                token: API_TOKEN
            }))
        }
    }, [status, dispatch])

    return status
}

export default useLogin