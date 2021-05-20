import React, { useEffect, useState } from "react"
import { Grid, makeStyles, Theme, useMediaQuery } from "@material-ui/core"

import { TabProps } from "./TabsRouter"
import { SubscriptionOptions } from "../../features/streams/withStreamSubscription"
import ModuleInstanceList from "../../features/modules/ModuleInstanceList"
import ModulesTabHero, { HeroState } from "./ModulesTabHero"
import { API } from "../../config/types"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import ModulesPanel from "./ModulesPanel"

const useStyles = makeStyles((theme) => ({
    panel: {
        [theme.breakpoints.up("md")]: {
            width: `${100/3}%`
        }
    }
}))

function ModulesTab({ guild, getStreamRef, onClearStreamRefs }: TabProps) {
    const classes = useStyles()

    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))

    const modules = useSelector((store: RootState) => store.modules.guilds[guild.id]?.data)
    const modulesState = useSelector((store: RootState) => store.modules.guilds[guild.id]?.status)

    const getInitialHeroState = () => {
        const firstModule = Object.values(modules || {})[0]
        return {
            type: "module",
            guild,
            moduleKey: firstModule?.key
        } as HeroState
    }
    
    const [heroState, setHeroState] = useState<HeroState>(
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
            instance: event.instance
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
        <Grid
            container
            spacing={4}
            direction={isSmallScreen ? "column-reverse" : "row"}
        >
            <Grid item xs={12} md className={classes.panel}>
                <ModuleInstanceList
                    guild={guild}
                    onHover={handleHover}
                    {...streamProps}
                />
            </Grid>

            <Grid item xs={12} md className={classes.panel}>
                <ModulesTabHero
                    state={heroState}
                    reset={() => setHeroState(getInitialHeroState())}
                />
            </Grid>

            <Grid item xs={12} md className={classes.panel}>
                <ModulesPanel
                    state={heroState}
                    onHeroStateChange={setHeroState}
                    {...streamProps}
                />
            </Grid>
        </Grid>
    )
}

export default ModulesTab
