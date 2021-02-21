import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Grid } from "@material-ui/core"

import { RootState } from "../../store"
import { API } from "../../config/types"
import ModuleCard from "./ModuleCard"
import { fetchModules } from "./modulesSlice"
import * as Skeletons from "../../components/Skeletons"
import withStreamSubscription from "../streams/withStreamSubscription"

function ModuleListForGuild({ guild }: { guild: API.Guild }) {
    const dispatch = useDispatch()

    const modules = useSelector((state: RootState) => state.modules.data)
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
        const activeModules = Object.values(modules).filter(module => module.key in moduleInstances)
        const inactiveModules = Object.values(modules).filter(module => !(module.key in moduleInstances))

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

    return <Skeletons.ModuleListForGuild/>
}

export default withStreamSubscription(ModuleListForGuild, "module-instances", {
    showOverlayIfEmpty: false
})