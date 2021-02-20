import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Select, MenuItem } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

import { RootState } from "../../store"
import { API } from "../../config/types"
import { fetchLocale as fetchGuildLocale, updateLocale as updateGuildLocaleAction } from "../../features/guilds/guildsSlice"
import { fetchLocales } from "../../features/locales/localeSlice"
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

    const updateGuildLocale = async (value: API.Locale) => {
        const resultAction = await dispatch(updateGuildLocaleAction({
            guildId: guild.id,
            value
        })) as any

        if (updateGuildLocaleAction.fulfilled.match(resultAction)) {
            return true
        } else {
            Logger.error(resultAction.error)
            return false
        }
    }

    const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as API.Locale

        const success = await updateGuildLocale(value)

        if (success) {
            opener.openSnackbar("Language updated")
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
    }, [guildLocaleStatus, dispatch, guild.id])

    let child = <Skeleton width={42} height={32} />

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

    return child
}

export default LocaleSelect