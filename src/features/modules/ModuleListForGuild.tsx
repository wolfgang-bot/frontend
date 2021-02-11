import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Grid } from "@material-ui/core"

import { RootState } from "../../store"
import { API } from "../../config/types"
import ModuleCard from "./ModuleCard"
import { fetchModules } from "./modulesSlice"
import { fetchModuleInstancesForGuild } from "../moduleInstances/moduleInstancesSlice"

function ModuleListForGuild({ guild }: { guild: API.Guild }) {
    const dispatch = useDispatch()

    const modules = useSelector((state: RootState) => state.modules.data)
    const modulesStatus = useSelector((state: RootState) => state.modules.status)
    const modulesError = useSelector((state: RootState) => state.modules.error)

    const moduleInstances = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.data)
    const moduleInstancesStatus = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.status)
    const moduleInstancesError = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.error)

    useEffect(() => {
        if (modulesStatus === "idle") {
            dispatch(fetchModules())
        }
    }, [modulesStatus, dispatch])

    useEffect(() => {
        if (moduleInstancesStatus === "idle") {
            dispatch(fetchModuleInstancesForGuild(guild.id))
        }
    }, [moduleInstancesStatus, dispatch, guild.id])

    if (modulesStatus === "success" && moduleInstancesStatus === "success") {
        const activeModules = Object.values(modules).filter(module => module.key in moduleInstances)
        const inactiveModules = Object.values(modules).filter(module => !(module.key in moduleInstances))

        return (
            <Grid container spacing={2}>
                { activeModules.concat(inactiveModules).map(module => (
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

    if (modulesStatus === "error" || moduleInstancesStatus === "error") {
        return <div>{ modulesError } <br/> { moduleInstancesError }</div>
    }

    return (
        <Grid container spacing={2}>
            {Array(5).fill(null).map((_, index) => (
                <Grid item key={index}>
                    <ModuleCard isLoading/>
                </Grid>
            ))}
        </Grid>
    )
}

export default ModuleListForGuild