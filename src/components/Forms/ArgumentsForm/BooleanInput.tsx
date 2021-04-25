import React from "react"
import { useFormContext, Controller } from "react-hook-form"
import { FormControlLabel, Checkbox } from "@material-ui/core"

import { API } from "../../../config/types"

function BooleanInput({ arg, guild, className, disabled }: {
    arg: API.Argument,
    guild: API.Guild,
    className?: string,
    disabled?: boolean
}) {
    const { control, errors } = useFormContext()

    const makeChangeListener = (
        onChange: (...event: any[]) => void
    ) => {
        return (_event: any, newValue: boolean) => {
            onChange(newValue)
        }
    }

    const hasError = arg.key in errors
    const helperText = hasError ? errors[arg.key]?.message : arg.desc

    return (
        <FormControlLabel
            control={
                <Controller
                    control={control}
                    name={arg.key}
                    error={hasError}
                    helperText={helperText}
                    render={({ onChange, value, ...props }) => (
                        <Checkbox
                            onChange={makeChangeListener(onChange)}
                            disabled={disabled}
                            checked={value}
                            {...props}
                        />
                    )}
                />
            }
            label={arg.desc}
            className={className}
            disabled={disabled}
        />
    )
}

export default BooleanInput
