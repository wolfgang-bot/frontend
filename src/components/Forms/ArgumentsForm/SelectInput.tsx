import React from "react"
import { useFormContext, Controller } from "react-hook-form"
import { FormControl, InputLabel, MenuItem, FormHelperText, Select } from "@material-ui/core"

import { API } from "../../../config/types"

function SelectInput({ arg, guild, className }: {
    arg: API.Argument,
    guild: API.Guild,
    className?: string
}) {
    const { control } = useFormContext()

    if (!arg.selectOptions) {
        throw new Error(`Missing property 'selectOptions' in argument '${arg.key}'`)
    }

    return (
        <FormControl className={className} fullWidth>
            <InputLabel id={arg.key}>{arg.name}</InputLabel>

            <Controller
                name={arg.key}
                control={control}
                defaultValue={arg.selectOptions[0]}
                as={
                    <Select labelId={arg.key}>
                        {arg.selectOptions.map((value, index) => (
                            <MenuItem value={value} key={index}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                }
            />

            <FormHelperText>{arg.desc}</FormHelperText>
        </FormControl>
    )
}

export default SelectInput
