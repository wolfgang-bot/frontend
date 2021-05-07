import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import { API } from "../../../config/types"
import ChannelInput from "./ChannelInput"
import ArrayInput from "./ArrayInput"
import RoleInput from "./RoleInput"
import StringInput from "./StringInput"
import NumberInput from "./NumberInput"
import BooleanInput from "./BooleanInput"
import SelectInput from "./SelectInput"

export type ArgumentInputProps = React.ComponentProps<typeof ArgumentInput>
export type ArgumentInputComponent = React.FunctionComponent<ArgumentInputProps>

function makeChannelInput(type: string) {
    return (props: any) => (
        <ChannelInput channelType={type} {...props} />
    )
}

function makeArrayInput(inputComponent: ArgumentInputComponent) {
    return (props: ArgumentInputProps) => (
        <ArrayInput inputComponent={inputComponent} {...props} />
    )
}

const inputMap: Record<string, React.FunctionComponent<
    React.ComponentProps<typeof ArgumentInput>>
> = {
    "string": StringInput,
    "number": NumberInput,
    "boolean": BooleanInput,
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
    className?: string,
    disabled?: boolean
}) {
    const classes = useStyles()

    let Input = inputMap[props.arg.type]

    if (props.arg.isSelect) {
        Input = SelectInput
    }

    if (props.arg.isArray) {
        Input = makeArrayInput(Input)
    }

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
