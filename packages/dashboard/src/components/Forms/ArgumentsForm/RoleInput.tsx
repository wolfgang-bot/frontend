import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useFormContext, Controller } from "react-hook-form"
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@material-ui/core"

import { API } from "../../../config/types"
import { RootState } from "../../../store"
import { fetchRoles } from "../../../features/guilds/guildsSlice"
import { ChannelInputSkeleton } from "./ChannelInput"

function RoleInput({ arg, guild, className, disabled }: {
    arg: API.Argument,
    guild: API.Guild,
    className?: string,
    disabled?: boolean
}) {
    const { control, errors } = useFormContext()

    const dispatch = useDispatch()

    const { status, error, data } = useSelector(
        (store: RootState) => store.guilds.user.data[guild.id]?.roles
    )

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchRoles(guild.id))
        }
    }, [status, dispatch, guild.id])

    if (status === "error") {
        return <div>{error}</div>
    } else if (status === "success") {
        const roles = Object.values(data)
            .sort((a, b) => a.rawPosition - b.rawPosition)

        const hasError = arg.key in errors
        const helperText = hasError ? errors[arg.key]?.message : arg.desc

        return (
            <FormControl
                className={className}
                fullWidth
                error={hasError}
                disabled={disabled}
            >
                <InputLabel id={arg.key}>{arg.name}</InputLabel>

                <Controller
                    name={arg.key}
                    control={control}
                    defaultValue={roles[0].id}
                    as={
                        <Select labelId={arg.key}>
                            {roles.map(role => (
                                <MenuItem value={role.id} key={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    }
                />

                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        )
    }

    return <ChannelInputSkeleton className={className}/>
}

export default RoleInput
