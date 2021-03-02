import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import { API } from "../../../config/types"
import makeChannelInput from "./ChannelInput"
import RoleInput from "./RoleInput"
import StringInput from "./StringInput"
import NumberInput from "./NumberInput"

const inputMap: Record<string, React.FunctionComponent<
    React.ComponentProps<typeof ArgumentInput>>
> = {
    "string": StringInput,
    "number": NumberInput,
    "text_channel": makeChannelInput("text"),
    "category_channel": makeChannelInput("category"),
    "role": RoleInput
}

const useStyles = makeStyles(theme => ({
    input: {
        minWidth: 300,
        marginBottom: theme.spacing(2)
    }
}))

function ArgumentInput(props: {
    arg: API.Argument,
    guild: API.Guild,
    className?: string
}) {
    const classes = useStyles()

    const Input = inputMap[props.arg.type]

    if (!Input) {
        throw new Error(`Unknown argument type: ${props.arg.type}`)
    }

    return (
        <Input
            {...props}
            className={classes.input}
        />
    )
}

export default ArgumentInput
