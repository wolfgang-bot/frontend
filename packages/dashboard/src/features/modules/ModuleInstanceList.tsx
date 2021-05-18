import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Typography } from "@material-ui/core"
import { zip } from "lodash"

import { RootState } from "../../store"
import ModuleInstanceCard, { ModuleInstanceCardSkeleton } from "./ModuleInstanceCard"
import withStreamSubscription from "../streams/withStreamSubscription"
import { fetchModules } from "./modulesSlice"
import { mergeStatus } from "../../utils"
import { API } from "../../config/types"
import emptyAnimation from "../../assets/images/tumbleweed.gif"

const AMOUNT_OF_CARDS = 4

function EmptyListIndicator() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Box mb={2}>
                <Typography align="center">
                    No running instances
                </Typography>
            </Box>
            <img src={emptyAnimation} alt="Empty"/>
        </Box>
    )
}

function ModuleInstanceList({ guild, onHover = () => {} }: {
    guild: API.Guild,
    onHover?: (props: {
        module: API.Module,
        instance: API.ModuleInstance
    }) => void
}) {
    const dispatch = useDispatch()
    
    const modules = useSelector((store: RootState) => store.modules.guilds[guild.id]?.data)
    const modulesStatus = useSelector((store: RootState) => store.modules.guilds[guild.id]?.status)
    const modulesError = useSelector((store: RootState) => store.modules.guilds[guild.id]?.error)
    
    const instances = useSelector((store: RootState) => store.moduleInstances.guilds[guild.id]?.data)
    const instancesStatus = useSelector((store: RootState) => store.moduleInstances.guilds[guild.id]?.status)
    const instancesError = useSelector((store: RootState) => store.moduleInstances.guilds[guild.id]?.error)

    useEffect(() => {
        if (modulesStatus === "idle") {
            dispatch(fetchModules({
                guildId: guild.id
            }))
        }
    }, [modulesStatus, dispatch, guild.id])

    const status = mergeStatus(modulesStatus, instancesStatus)

    if (status === "success") {
        const filtered = zip(
            Object.values(instances).map(instance => modules[instance.moduleKey]),
            Object.values(instances)
        ).filter(([module]) => !module?.isStatic)
        
        if (filtered.length === 0) {
            return <EmptyListIndicator/>
        }

        return (
            <>
                {filtered.map(([module, instance]) => {
                    if (!module || !instance) {
                        throw new Error(`Missing module for instance ${instance?.moduleKey}`)
                    }
                    
                    return (
                        <Box
                            key={instance.id}
                            mb={2}
                            onMouseEnter={() => onHover({ module, instance })}
                        >
                            <ModuleInstanceCard
                                instance={instance}
                                module={modules[instance.moduleKey]}
                            />
                        </Box>
                    )
                })}
            </>
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
