import React from "react"
import Skeleton from "@material-ui/lab/Skeleton"

import CommandList from "./CommandList"

function GroupSelect() {
    return (
        <Skeleton
            variant="rect"
            height={48}
        />
    )
}

function CommandListForModule() {
    return (
        <>
            <GroupSelect/>
            <CommandList/>
        </>
    )
}

export default CommandListForModule