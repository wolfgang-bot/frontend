import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card, CardContent, Grid, Typography } from "@material-ui/core"

import { RootState } from "../../store"
import { fetchModules } from "./modulesSlice"
import { API } from "../../config/types"
import Skeleton from "@material-ui/lab/Skeleton"
// import ModuleCard, { ModuleCardSkeleton } from "./ModuleInstanceCard"

const AMOUNT_OF_CARDS = 4

const seeds: number[] = []

for (let i = 0; i < AMOUNT_OF_CARDS; i++) {
    seeds[i] = Math.random()
}

function ModuleCard({ module }: { module: API.Module }) {
    return (
        <Card>
            <CardContent>
                <Typography>{ module.name }</Typography>
            </CardContent>
        </Card>
    )
}

function ModuleCardSkeleton({ seed }: { seed: number }) {
    return (
        <Skeleton width={100} height={40}/>
    )
}

function ModuleList() {
    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.modules.status)
    const data = useSelector((store: RootState) => (
        Object.values(store.modules.data).filter(module => !module.isStatic)
    ))
    const error = useSelector((store: RootState) => store.modules.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchModules("http"))
        }
    }, [status, dispatch])

    if (status === "success") {
        return (
            <Grid container spacing={2}>
                {data.map(module => (
                    <Grid item key={module.key}>
                        <ModuleCard module={module}/>
                    </Grid>                    
                ))}
            </Grid>
        )
    }

    if (status === "error") {
        return (
            <div>{error}</div>
        )
    }

    return <ModuleListSkeleton/>
}

export function ModuleListSkeleton() {
    return (
        <Grid container spacing={2}>
            {seeds.map((seed, index) => (
                <Grid item key={index}>
                    <ModuleCardSkeleton seed={seed} />
                </Grid>
            ))}
        </Grid>
    )
}

export default ModuleList
