import React from "react"

import { API } from "../../../config/types"
import makeChannelInput from "./ChannelInput"
import RoleInput from "./RoleInput"

const inputMap: Record<string, React.FunctionComponent<
    React.ComponentProps<typeof ArgumentInput>>
> = {
    "text_channel": makeChannelInput("text"),
    "category_channel": makeChannelInput("category"),
    "role": RoleInput
}

function ArgumentInput(props: {
    arg: API.Argument,
    guild: API.Guild
}) {
    const Input = inputMap[props.arg.type]

    if (!Input) {
        throw new Error(`Unknown argument type: ${props.arg.type}`)
    }

    return <Input {...props}/>
}

export default ArgumentInput
