import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { Typography } from "@material-ui/core"

import { RootState } from "../store"
import { fetchGuilds } from "../features/guilds/guildsSlice"
import Layout from "../components/Layout/Layout"
import MemberCount from "../features/guilds/MemberCount"
import LocaleSelect from "../features/locales/LocaleSelect"
import ModuleListForGuild from "../features/modules/ModuleListForGuild"
import MemberChart from "../components/Charts/MemberChart"
import MessageChart from "../components/Charts/MessageChart"
import VoiceDurationChart from "../components/Charts/VoiceDurationChart"
import * as Skeletons from "../components/Skeletons"

function GuildPage() {
    const { guildId } = useParams<{ guildId: string }>()

    const dispatch = useDispatch()

    const guild = useSelector((store: RootState) => store.guilds.data[guildId])
    const status = useSelector((store: RootState) => store.guilds.status)
    const error = useSelector((store: RootState) => store.guilds.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGuilds())
        }
    }, [status, dispatch])

    let child = <Skeletons.ModuleListForGuild/>

    if (status === "success") {
        if (!guild.isActive) {
            return <Redirect to="/not-found" />
        }
        
        child = (
            <>
                <Typography variant="h6">Member Count</Typography>
                <MemberCount guild={guild}/>
                <Typography variant="h6">Language</Typography>
                <LocaleSelect guild={guild}/>
                <Typography variant="h6">Member Chart</Typography>
                <MemberChart guild={guild}/>
                <Typography variant="h6">Message Chart</Typography>
                <MessageChart guild={guild}/>
                <Typography variant="h6">Voice Duration Chart</Typography>
                <VoiceDurationChart guild={guild}/>
                <Typography variant="h6">Modules</Typography>
                <ModuleListForGuild guild={guild} />
            </>
        )
    }
    
    if (status === "error") {
        child = <div>{ error }</div>
    }

    return (
        <Layout>
            { child }
        </Layout>
    )
}

export default GuildPage