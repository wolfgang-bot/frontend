import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { RootState } from "../store"
import { initAPI } from "../features/auth/authSlice"

function useLogin() {
    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.auth.status)
    const token = useSelector((store: RootState) => store.auth.data.token)

    useEffect(() => {
        if (token && status === "idle") {
            dispatch(initAPI({ token }))
        }

        // eslint-disable-next-line
    }, [])

    return status
}

export default useLogin
