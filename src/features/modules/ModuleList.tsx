import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Grid } from "@material-ui/core"

import { RootState } from "../../store"
import { fetchModules } from "./modulesSlice"
import ModuleCard, { ModuleCardSkeleton } from "./ModuleCard"

const AMOUNT_OF_CARDS = 4

const seeds: number[] = []

for (let i = 0; i < AMOUNT_OF_CARDS; i++) {
    seeds[i] = Math.random()
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
