import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useFormContext, Controller } from "react-hook-form"
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { API } from "../../../config/types"
import { RootState } from "../../../store"
import { fetchRoles } from "../../../features/guilds/guildsSlice"
import * as Skeletons from "../../Skeletons"

const useStyles = makeStyles({
    formControl: {
        minWidth: 300
    }
})

function RoleInput({ arg, guild }: {
    arg: API.Argument,
    guild: API.Guild
}) {
    const classes = useStyles()

    const { control } = useFormContext()

    const dispatch = useDispatch()

    const { status, error, data } = useSelector(
        (store: RootState) => store.guilds.data[guild.id]?.roles
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

        return (
            <FormControl className={classes.formControl} fullWidth>
                <InputLabel id={arg.name}>{arg.name}</InputLabel>

                <Controller
                    name={arg.name}
                    control={control}
                    defaultValue={roles[0].id}
                    as={
                        <Select labelId={arg.name}>
                            {roles.map(role => (
                                <MenuItem value={role.id} key={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    }
                />

                <FormHelperText>{arg.desc}</FormHelperText>
            </FormControl>
        )
    }

    return <Skeletons.ChannelInput />
}

export default RoleInput
