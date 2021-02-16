import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Typography } from "@material-ui/core"

import { RootState } from "../store"
import Layout from "../components/Layout/Layout"
import MemberCount from "../features/guilds/MemberCount"
import LocaleSelect from "../features/locales/LocaleSelect"
import ModuleListForGuild from "../features/modules/ModuleListForGuild"
import MessageChart from "../components/Charts/MessageChart"
import * as Skeletons from "../components/Skeletons"

function GuildPage() {
    const { id } = useParams<{ id: string }>()

    const guild = useSelector((store: RootState) => store.guilds.data[id])
    const status = useSelector((store: RootState) => store.guilds.status)
    const error = useSelector((store: RootState) => store.guilds.error)

    let child = <Skeletons.ModuleListForGuild/>

    if (status === "success") {
        child = (
            <>
                <Typography variant="h6">Member Count</Typography>
                <MemberCount guild={guild}/>
                <Typography variant="h6">Language</Typography>
                <LocaleSelect guild={guild}/>
                <Typography variant="h6">Message Chart</Typography>
                <MessageChart guild={guild}/>
                <Typography variant="h6">Modules</Typography>
                <ModuleListForGuild guild={guild} />
            </>
        )
    }
    
    if (status === "error") {
        child = <div>{ error }</div>
    }

    return (
        <Layout
            sidebarProps={{
                activeGuildId: guild?.id
            }}
        >
            { child }
        </Layout>
    )
}

export default GuildPage