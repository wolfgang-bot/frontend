import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useFormContext, Controller } from "react-hook-form"
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { API } from "../../../config/types"
import { RootState } from "../../../store"
import { fetchChannels } from "../../../features/guilds/guildsSlice"
import { CircularProgress } from "@material-ui/core"

const useStyles = makeStyles({
    formControl: {
        minWidth: 300
    }
})

function ChannelInput({ arg, guild, channelType }: {
    arg: API.Argument,
    guild: API.Guild,
    channelType: string
}) {
    const classes = useStyles()

    const { control } = useFormContext()

    const dispatch = useDispatch()

    const { status, error, data } = useSelector(
        (store: RootState) => store.guilds.data[guild.id]?.channels
    )

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchChannels(guild.id))
        }
    }, [status, dispatch, guild.id])

    if (status === "error") {
        return <div>{ error }</div>
    } else if (status === "success") {
        const channels = Object.values(data).filter(channel => channel.type === channelType)

        return (
            <FormControl className={classes.formControl}>
                <InputLabel id={arg.name}>{ arg.displayName }</InputLabel>

                <Controller
                    name={arg.name}
                    control={control}
                    defaultValue={channels[0].id}
                    as={
                        <Select fullWidth labelId={arg.name}>
                            {channels.map(channel => (
                                <MenuItem value={channel.id} key={channel.id}>
                                    {channel.name}
                                </MenuItem>
                            ))}
                        </Select>
                    }
                />

                <FormHelperText>{ arg.desc }</FormHelperText>
            </FormControl>
        )
    }

    return <CircularProgress/>
}

function makeChannelInput(type: string) {
    return (props: any) => (
        <ChannelInput channelType={type} {...props} />
    )
}

export default makeChannelInput