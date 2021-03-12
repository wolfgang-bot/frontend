import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useFormContext, Controller } from "react-hook-form"
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, Box } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

import { API } from "../../../config/types"
import { RootState } from "../../../store"
import { fetchChannels } from "../../../features/guilds/guildsSlice"

function ChannelInput({ arg, guild, className, channelType }: {
    arg: API.Argument,
    guild: API.Guild,
    className?: string,
    channelType: string
}) {
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
        const channels = Object.values(data)
            .filter(channel => channel.type === channelType)
            .sort((a, b) => a.rawPosition - b.rawPosition)

        return (
            <FormControl className={className} fullWidth>
                <InputLabel id={arg.key}>{arg.name}</InputLabel>

                <Controller
                    name={arg.key}
                    control={control}
                    defaultValue={channels[0].id}
                    as={
                        <Select labelId={arg.key}>
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

    return <ChannelInputSkeleton className={className}/>
}

export function ChannelInputSkeleton(props: React.ComponentProps<typeof Box>) {
    return (
        <Box {...props} mb={1}>
            <Skeleton height={12} width="20%" />
            <Box my={0.5}>
                <Skeleton variant="rect" height={32} />
            </Box>
            <Skeleton height={19} width="70%" />
        </Box>
    )
}

export default ChannelInput
