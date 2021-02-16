import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Grid } from "@material-ui/core"

import { RootState } from "../../store"
import { API } from "../../config/types"
import ModuleCard from "./ModuleCard"
import { fetchModules } from "./modulesSlice"
import { subscribe, pause, resume } from "../streams/streamsSlice"
import * as Skeletons from "../../components/Skeletons"

function ModuleListForGuild({ guild }: { guild: API.Guild }) {
    const streamArgs = useMemo<API.StreamArgs>(() => ({
        eventStream: "module-instances",
        guildId: guild.id
    }), [guild.id])

    const dispatch = useDispatch()

    const modules = useSelector((state: RootState) => state.modules.data)
    const modulesStatus = useSelector((state: RootState) => state.modules.status)
    const modulesError = useSelector((state: RootState) => state.modules.error)

    const moduleInstances = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.data)
    const moduleInstancesStatus = useSelector((state: RootState) => state.moduleInstances.guilds[guild.id]?.status)

    const streamStatus = useSelector((state: RootState) => state.streams[guild.id]?.["module-instances"].status)

    useEffect(() => {
        if (modulesStatus === "idle") {
            dispatch(fetchModules())
        }
    }, [modulesStatus, dispatch])

    useEffect(() => {
        if (streamStatus === "idle") {
            dispatch(subscribe(streamArgs))
        } else if (streamStatus === "paused") {
            dispatch(resume(streamArgs))
        }
    }, [streamStatus, streamArgs, dispatch])

    useEffect(() => {
        return () => {
            dispatch(pause(streamArgs))
        }
    }, [dispatch, streamArgs])

    if (modulesStatus === "success" && moduleInstancesStatus === "success") {
        const activeModules = Object.values(modules).filter(module => module.key in moduleInstances)
        const inactiveModules = Object.values(modules).filter(module => !(module.key in moduleInstances))

        return (
            <Grid container spacing={2}>
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

export default ModuleListForGuild