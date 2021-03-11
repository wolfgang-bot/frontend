import React from "react"
import { useFormContext, Controller } from "react-hook-form"
import { FormControlLabel, Checkbox } from "@material-ui/core"

import { API } from "../../../config/types"

function BooleanInput({ arg, guild, className }: {
    arg: API.Argument,
    guild: API.Guild,
    className?: string
}) {
    const { control } = useFormContext()

    const makeChangeListener = (
        onChange: (...event: any[]) => void
    ) => {
        return (_event: any, newValue: boolean) => {
            onChange(newValue)
        }
    }

    return (
        <FormControlLabel
            control={
                <Controller
                    control={control}
                    name={arg.key}
                    render={({ onChange, onBlur, value, name, ref }) => {
                        console.log({ value })
                        return (
                            <Checkbox
                                onChange={makeChangeListener(onChange)}
                                onBlur={onBlur}
                                checked={value}
                                name={name}
                                ref={ref}
                            />
                        )
                    }}
                />
            }
            label={arg.desc}
            className={className}
        />
    )
}

export default BooleanInput
