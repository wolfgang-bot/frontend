import React from "react"
import { useFormContext } from "react-hook-form"
import { TextField } from "@material-ui/core"

import { API } from "../../../config/types"

function NumberInput({ arg, guild, className }: {
    arg: API.Argument,
    guild: API.Guild,
    className?: string
}) {
    const { register } = useFormContext()

    return (
        <TextField
            fullWidth
            type="number"
            name={arg.key}
            label={arg.name}
            inputRef={register()}
            helperText={arg.desc}
            className={className}
        />
    )
}

export default NumberInput
