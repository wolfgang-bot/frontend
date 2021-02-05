import React, { ChangeEvent } from "react"
import { useFormContext } from "react-hook-form"
import { TextField } from "@material-ui/core"

function StringInput({ onChange, ...props }: {
    onChange?: (value: string) => void,
    name: string
}) {
    const { register, errors } = useFormContext()
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.currentTarget.value)
        }
    }

    const hasError = props.name in errors

    return (
        <TextField
            fullWidth
            variant="outlined"
            inputRef={register()}
            onChange={handleChange}
            error={hasError}
            helperText={hasError && errors[props.name].message}
            {...props}
        />
    )
}

export default StringInput