import React, { useEffect, useState } from "react"
import { Grid } from "@material-ui/core"

import { TabProps } from "./TabsRouter"

import { SubscriptionOptions } from "../../features/streams/withStreamSubscription"
import ModuleList from "../../features/modules/ModuleList"
import ModuleInstanceList from "../../features/modules/ModuleInstanceList"
import ModulesTabHero, { HeroState } from "./ModulesTabHero"
import { API } from "../../config/types"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import opener from "../../components/ComponentOpener"

function ModulesTab({ guild, getStreamRef, onClearStreamRefs }: TabProps) {
    const modules = useSelector((store: RootState) => store.modules.data)
    const modulesState = useSelector((store: RootState) => store.modules.status)
    
    const [heroState, setHeroState] = useState<HeroState>()

    const handleHover = (event: {
        module: API.Module,
        instance?: API.ModuleInstance
    }) => {
        const type: HeroState["type"] = event.instance ? "instance" : "module"
        setHeroState({ ...event, guild, type })
    }

    const handleModuleClick = (event: { module: API.Module }) => {
        opener.openDialog("ModuleStartDialog", {
            module: event.module,
            guild
        })
    }
    
    useEffect(() => {
        const firstModule = Object.values(modules)[0]
        if (firstModule) {
            setHeroState({
                type: "module",
                guild,
                module: firstModule
            })
        }
        // eslint-disable-next-line
    }, [modulesState])

    const streamProps: Record<string, any> & SubscriptionOptions = {
        guild,
        ref: getStreamRef,
        useAutomatedStreamPausing: false
    }

    onClearStreamRefs()

    return (
        <Grid container spacing={4}>
            <Grid item xs>
                <ModuleInstanceList
                    guild={guild}
                    onHover={handleHover}
                    {...streamProps}
                />
            </Grid>

            <Grid item xs>
                <ModulesTabHero state={heroState}/>
            </Grid>

            <Grid item xs>
                <ModuleList
                    onHover={handleHover}
                    onClick={handleModuleClick}
                />
            </Grid>
        </Grid>
    )
}

export default ModulesTab
