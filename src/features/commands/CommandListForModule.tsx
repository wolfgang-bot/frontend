import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CircularProgress } from "@material-ui/core"

import { RootState } from "../../store"
import { fetchCommands } from "./commandsSlice"
import CommandGroups from "./CommandGroups"

function CommandListForModule({ moduleKey }: {
    moduleKey: string
}) {
    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.commands.status)
    const data = useSelector((store: RootState) => store.commands.data?.[moduleKey])
    const error = useSelector((store: RootState) => store.commands.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCommands())
        }
    }, [dispatch, status])

    if (status === "success") {
        if (!data) {
            return null
        }

        return (
            <CommandGroups groups={data}/>  
        )
    }

    if (status === "error") {
        return (
            <div>{error}</div>
        )
    }
    
    return (
        <CircularProgress/>
    )
}

export default CommandListForModule