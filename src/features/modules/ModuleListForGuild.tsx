import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Grid } from "@material-ui/core"

import { RootState } from "../../store"
import { API } from "../../config/types"
import ModuleCard from "./ModuleCard"
import { fetchModules } from "./modulesSlice"
import withStreamSubscription from "../streams/withStreamSubscription"
import { ModuleCardSkeleton } from "./ModuleCard"

const AMOUNT_OF_CARDS = 4

const seeds: number[] = []

for (let i = 0; i < AMOUNT_OF_CARDS; i++) {
    seeds[i] = Math.random()
}

function ModuleListForGuild({ guild }: { guild: API.Guild }) {
    const dispatch = useDispatch()

    const modules = useSelector((state: RootState) => (
        Object.values(state.modules.data).filter(module => !module.isStatic)
    ))
    const modulesStatus = useSelector((state: RootState) => state.modules.status)
    const modulesError = useSelector((state: RootState) => state.modules.error)

    const moduleInstances = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.data)
    const moduleInstancesStatus = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.status)

    useEffect(() => {
        if (modulesStatus === "idle") {
            dispatch(fetchModules("ws"))
        }
    }, [modulesStatus, dispatch])

    if (modulesStatus === "success" && moduleInstancesStatus === "success") {
        const activeModules = modules.filter(module => module.key in moduleInstances)
        const inactiveModules = modules.filter(module => !(module.key in moduleInstances))

        return (
            <Grid container justify="space-between">
                {activeModules.concat(inactiveModules).map(module => (
                    <Grid item key={module.key}>
                        <ModuleCard
                            guild={guild}
                            module={module}
                            instance={moduleInstances[module.key]}
                        />
                    </Grid>
                ))}
            </Grid>
        )
    }

    if (modulesStatus === "error") {
        return <div>{modulesError}</div>
    }

    return <ModuleListForGuildSkeleton/>
}

export function ModuleListForGuildSkeleton() {
    return (
        <Grid container spacing={2} justify="space-between">
            {seeds.map((seed, index) => (
                <Grid item key={index}>
                    <ModuleCardSkeleton seed={seed} guild />
                </Grid>
            ))}
        </Grid>
    )
}

export default withStreamSubscription(ModuleListForGuild, "module-instances", {
    showOverlayIfEmpty: false
})
