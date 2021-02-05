import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress, Grid } from "@material-ui/core"

import { RootState } from "../../store"
import { API } from "../../config/types"
import ModuleInstanceCard from "./ModuleInstanceCard"
import { fetchModules } from "../modules/modulesSlice"
import { fetchModuleInstancesForGuild } from "./moduleInstancesSlice"

function ModuleInstaceListForGuild({ guild }: { guild: API.Guild }) {
    const dispatch = useDispatch()

    const modules = useSelector((state: RootState) => state.modules.data)
    const modulesStatus = useSelector((state: RootState) => state.modules.status)
    const modulesError = useSelector((state: RootState) => state.modules.error)

    const moduleInstances = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.data?.moduleInstances)
    const moduleInstancesStatus = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.status)
    const moduleInstancesError = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.error)

    useEffect(() => {
        if (modulesStatus === "idle") {
            dispatch(fetchModules())
        }
    }, [modulesStatus])

    useEffect(() => {
        if (moduleInstancesStatus === "idle") {
            dispatch(fetchModuleInstancesForGuild(guild.id))
        }
    }, [moduleInstancesStatus])

    if (modulesStatus === "pending" || moduleInstancesStatus === "pending") {
        return <CircularProgress/>
    }

    if (modulesStatus === "error" || moduleInstancesStatus === "error") {
        return <div>{ modulesError } <br/> { moduleInstancesError }</div>
    }

    console.log({ modules, moduleInstances })

    const activeModules = Object.values(modules).filter(module => module.name in moduleInstances)
    const inactiveModules = Object.values(modules).filter(module => !(module.name in moduleInstances))

    return (
        <Grid container spacing={2}>
            { activeModules.concat(inactiveModules).map(module => (
                <Grid item key={module.name}>
                    <ModuleInstanceCard
                        guild={guild}
                        module={module}
                        onUpdate={async () => {
                            console.log("Update", module)
                        }}
                        active={module.name in moduleInstances}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default ModuleInstaceListForGuild