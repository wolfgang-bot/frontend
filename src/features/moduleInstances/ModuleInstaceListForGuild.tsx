import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress, Grid } from "@material-ui/core"

import { RootState } from "../../store"
import ModuleInstanceCard from "./ModuleInstanceCard"
import { fetchModules } from "../modules/modulesSlice"
import { fetchModuleInstancesForGuild } from "./moduleInstancesSlice"

function ModuleInstaceListForGuild({ guildId }: { guildId: string }) {
    const dispatch = useDispatch()

    const modules = useSelector((state: RootState) => state.modules.data)
    const modulesStatus = useSelector((state: RootState) => state.modules.status)
    const modulesError = useSelector((state: RootState) => state.modules.error)

    const moduleInstances = useSelector((state: RootState) => state.moduleInstances.guilds[guildId]?.data?.moduleInstances)
    const moduleInstancesStatus = useSelector((state: RootState) => state.moduleInstances.guilds[guildId]?.status)
    const moduleInstancesError = useSelector((state: RootState) => state.moduleInstances.guilds[guildId]?.error)

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

    // const activeModules = modules.filter(module => moduleInstances.includes(module.name))
    // const inactiveModules = modules.filter(module => !moduleInstances.includes(module.name))

    // return (
    //     <Grid container spacing={2}>
    //         { activeModules.concat(inactiveModules).map(module => (
    //             <Grid item key={module.name}>
    //                 <ModuleInstanceCard
    //                     guildId={guildId}
    //                     module={module}
    //                     onUpdate={moduleInstances.reload}
    //                     active={moduleInstances.data.includes(module.name)}
    //                 />
    //             </Grid>
    //         ))}
    //     </Grid>
    // )
}

export default ModuleInstaceListForGuild