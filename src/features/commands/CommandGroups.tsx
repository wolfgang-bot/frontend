import React, { useState } from "react"
import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { API } from "../../config/types"
import GroupSelect from "./GroupSelect"
import CommandList from "./CommandList"

const useStyles = makeStyles(theme => ({
    groupSelect: {
        marginBottom: theme.spacing(1)
    }
}))

function CommandListForModule({ groups }: {
    groups: Record<string, Record<string, API.Command>>
}){
    const classes = useStyles()

    const [currentGroup, setCurrentGroup] = useState<string>(
        Object.keys(groups)[0]
    )

    return (
        <Box>
            <GroupSelect
                groups={Object.keys(groups)}
                onChange={setCurrentGroup}
                className={classes.groupSelect}
            />
            <CommandList commands={groups[currentGroup]}/>
        </Box>
    )
}

export default CommandListForModule