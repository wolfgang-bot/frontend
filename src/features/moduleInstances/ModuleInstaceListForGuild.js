import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress, Grid } from "@material-ui/core"

import ModuleInstanceCard from "./ModuleInstanceCard.js"
import { fetchModules } from "../modules/modulesSlice.js"
import { fetchModuleInstancesForGuild } from "./moduleInstancesSlice.js"

function ModuleInstaceListForGuild({ guildId }) {
    const dispatch = useDispatch()

    const modules = useSelector(state => state.modules.data)
    const modulesStatus = useSelector(state => state.modules.status)
    const modulesError = useSelector(state => state.modules.error)

    const moduleInstances = useSelector(state => state.moduleInstances.guilds[guildId]?.moduleInstances)
    const moduleInstancesStatus = useSelector(state => state.moduleInstances.guilds[guildId]?.status)
    const moduleInstancesError = useSelector(state => state.moduleInstances.guilds[guildId]?.error)

    useEffect(() => {
        if (modulesStatus === "idle") {
            dispatch(fetchModules())
        }

        if (moduleInstancesStatus === "idle") {
            dispatch(fetchModuleInstancesForGuild(guildId))
        }
    })

    if (modulesStatus === "pending" || moduleInstancesStatus === "pending") {
        return <CircularProgress/>
    }

    if (modulesStatus === "error" || moduleInstancesStatus === "error") {
        return <div>{ modulesError } <br/> { moduleInstancesError }</div>
    }

    console.log({ modules, moduleInstances })
    
    return null

    const activeModules = modules.filter(module => moduleInstances.includes(module.name))
    const inactiveModules = modules.filter(module => !moduleInstances.includes(module.name))

    return (
        <Grid container spacing={2}>
            { activeModules.concat(inactiveModules).map(module => (
                <Grid item key={module.name}>
                    <ModuleInstanceCard
                        guildId={guildId}
                        module={module}
                        onUpdate={moduleInstances.reload}
                        active={moduleInstances.data.includes(module.name)}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default ModuleInstaceListForGuild