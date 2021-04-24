import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Grid } from "@material-ui/core"
import { zip } from "lodash"

import { RootState } from "../../store"
import ModuleInstanceCard, { ModuleInstanceCardSkeleton } from "./ModuleInstanceCard"
import withStreamSubscription from "../streams/withStreamSubscription"
import { fetchModules } from "./modulesSlice"
import { mergeStatus } from "../../utils"
import { API } from "../../config/types"

const AMOUNT_OF_CARDS = 4

function ModuleInstanceList({ guild }: { guild: API.Guild }) {
    const dispatch = useDispatch()
    
    const modules = useSelector((state: RootState) => state.modules.data)
    const modulesStatus = useSelector((state: RootState) => state.modules.status)
    const modulesError = useSelector((state: RootState) => state.modules.error)
    
    const instances = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.data)
    const instancesStatus = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.status)
    const instancesError = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.error)

    useEffect(() => {
        if (modulesStatus === "idle") {
            dispatch(fetchModules("ws"))
        }
    }, [modulesStatus, dispatch])

    const status = mergeStatus(modulesStatus, instancesStatus)

    if (status === "success") {
        const filtered = zip(
            Object.values(instances).map(instance => modules[instance.moduleKey]),
            Object.values(instances)
        ).filter(([module]) => !module?.isStatic)

        return (
            <Grid container justify="space-between">
                {filtered.map(([module, instance]) => {
                    if (!module || !instance) {
                        throw new Error(`Missing module for instance ${instance?.moduleKey}`)
                    }
                    
                    return (
                        <Grid item key={instance.moduleKey}>
                            <ModuleInstanceCard
                                instance={instance}
                                module={modules[instance.moduleKey]}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        )
    }

    if (status === "error") {
        return <div>{modulesError} {instancesError}</div>
    }

    return <ModuleInstanceListSkeleton/>
}

export function ModuleInstanceListSkeleton() {
    return (
        <>
            {Array(AMOUNT_OF_CARDS).fill(0).map((_, index) => (
                <Box mb={2} key={index}>
                    <ModuleInstanceCardSkeleton />
                </Box>
            ))}
        </>
    )
}

export default withStreamSubscription(ModuleInstanceList, "guild-module-instances", {
    showOverlayIfEmpty: false
})
