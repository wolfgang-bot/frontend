import React from "react"
import { useFormContext } from "react-hook-form"
import { TextField } from "@material-ui/core"

import { API } from "../../../config/types"

function NumberInput({ arg, guild, className, disabled }: {
    arg: API.Argument,
    guild: API.Guild,
    className?: string,
    disabled?: boolean
}) {
    const { register, errors } = useFormContext()

    const hasError = arg.key in errors
    const helperText = hasError ? errors[arg.key]?.message : arg.desc

    return (
        <TextField
            fullWidth
            type="number"
            name={arg.key}
            label={arg.name}
            inputRef={register()}
            helperText={helperText}
            className={className}
            error={hasError}
            disabled={disabled}
        />
    )
}

export default NumberInput
