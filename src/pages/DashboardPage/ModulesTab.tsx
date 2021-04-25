import React, { useEffect, useState } from "react"
import { Grid, makeStyles } from "@material-ui/core"

import { TabProps } from "./TabsRouter"

import { SubscriptionOptions } from "../../features/streams/withStreamSubscription"
import ModuleInstanceList from "../../features/modules/ModuleInstanceList"
import ModulesTabHero, { HeroState } from "./ModulesTabHero"
import { API } from "../../config/types"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import ModulesPanel from "./ModulesPanel"

const useStyles = makeStyles({
    panel: {
        width: `${100/3}%`
    }
})

function ModulesTab({ guild, getStreamRef, onClearStreamRefs }: TabProps) {
    const classes = useStyles()

    const modules = useSelector((store: RootState) => store.modules.data)
    const modulesState = useSelector((store: RootState) => store.modules.status)

    const getInitialHeroState = () => {
        const firstModule = Object.values(modules)[0]
        if (firstModule) {
            return {
                type: "module",
                guild,
                moduleKey: firstModule.key
            } as HeroState
        }
    }
    
    const [heroState, setHeroState] = useState<HeroState | undefined>(
        getInitialHeroState()
    )

    const handleHover = (event: {
        module: API.Module,
        instance?: API.ModuleInstance
    }) => {
        const type: HeroState["type"] = event.instance ? "instance" : "module"
        setHeroState({
            type,
            guild,
            moduleKey: event.module.key,
            instanceModuleKey: event.instance?.moduleKey
        })
    }
    
    useEffect(() => {
        setHeroState(getInitialHeroState())
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
            <Grid item xs className={classes.panel}>
                <ModuleInstanceList
                    guild={guild}
                    onHover={handleHover}
                    {...streamProps}
                />
            </Grid>

            <Grid item xs className={classes.panel}>
                <ModulesTabHero
                    state={heroState}
                    reset={() => setHeroState(getInitialHeroState())}
                />
            </Grid>

            <Grid item xs className={classes.panel}>
                <ModulesPanel
                    state={heroState}
                    onHeroStateChange={setHeroState}
                />
            </Grid>
        </Grid>
    )
}

export default ModulesTab
