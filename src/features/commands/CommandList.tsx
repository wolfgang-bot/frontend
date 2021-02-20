import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import { API } from "../../config/types"
import CommandCard from "./CommandCard"

const useStyles = makeStyles(theme => ({
    command: {
        marginTop: theme.spacing(3)
    }
}))

function flattenCommands(commands: API.Command[]) {
    const result: API.Command[] = []

    for (let command of commands) {
        if ("commands" in command) {
            result.push(...flattenCommands(
                Object.values(command.commands)
            ))
        } else {
            result.push(command)
        }
    }

    return result
}

function CommandList({ commands }: {
    commands: Record<string, API.Command>
}) {
    const classes = useStyles()

    const flattenedCommands = flattenCommands(
        Object.values(commands)
    )
    
    return (
        <>
            {flattenedCommands.map(command => (
                <CommandCard
                    key={command.callableName}
                    command={command}
                    className={classes.command}
                />
            ))}
        </>
    )
}

export default CommandList