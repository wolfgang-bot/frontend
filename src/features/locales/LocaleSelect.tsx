import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Select, MenuItem, Typography } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

import { RootState } from "../../store"
import { API } from "../../config/types"
import { fetchLocale as fetchGuildLocale, setLocale as setGuildLocale } from "../../features/guilds/guildsSlice"
import { fetchLocales } from "../../features/locales/localeSlice"
import api from "../../api"
import Logger from "../../utils/Logger"
import opener from "../../components/ComponentOpener"

function LocaleSelect({ guild }: { guild: API.Guild }) {
    const dispatch = useDispatch()

    const localesStatus = useSelector((store: RootState) => store.locales.status)
    const locales = useSelector((store: RootState) => store.locales.data)
    const localesError = useSelector((store: RootState) => store.locales.error)

    const guildLocaleStatus = useSelector((store: RootState) => store.guilds.data[guild.id]?.locale.status)
    const guildLocale = useSelector((store: RootState) => store.guilds.data[guild.id]?.locale.data)
    const guildLocaleError = useSelector((store: RootState) => store.guilds.data[guild.id]?.locale.error)

    const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as API.Locale

        try {
            await api.ws.setGuildLocale(guild.id, value)
            dispatch(setGuildLocale({
                guildId: guild.id,
                value
            }))
            opener.openSnackbar("Language updated")
        } catch (error) {
            Logger.error(error)
        }
    }

    useEffect(() => {
        if (localesStatus === "idle") {
            dispatch(fetchLocales())
        }
    }, [localesStatus, dispatch])

    useEffect(() => {
        if (guildLocaleStatus === "idle") {
            dispatch(fetchGuildLocale(guild.id))
        }
    }, [guildLocaleStatus, dispatch])

    let child = <Skeleton width={100} height={24} />

    if (localesStatus === "success" && guildLocaleStatus === "success") {
        child = (
            <Select value={guildLocale} onChange={handleChange}>
                {locales.map(locale => (
                    <MenuItem value={locale} key={locale}>
                        {locale}
                    </MenuItem>
                ))}
            </Select>
        )
    }

    if (localesStatus === "error" || guildLocaleStatus === "error") {
        child = (
            <div>
                {localesError}
                {guildLocaleError}
            </div>
        )
    }

    return (
        <>
            <Typography variant="body1">Language</Typography>
            {child}
        </>
    )
}

export default LocaleSelect