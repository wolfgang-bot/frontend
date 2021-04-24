import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Box } from "@material-ui/core"

import { RootState } from "../../store"
import { fetchModules } from "./modulesSlice"
import ModuleCard, { ModuleCardSkeleton } from "./ModuleCard"

const AMOUNT_OF_CARDS = 4

function ModuleList() {
    const dispatch = useDispatch()

    const modules = useSelector((store: RootState) => store.modules.data)
    const status = useSelector((store: RootState) => store.modules.status)
    const error = useSelector((store: RootState) => store.modules.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchModules("http"))
        }
    }, [status, dispatch])

    if (status === "success") {
        const filtered = Object.values(modules)
            .filter(module => !module.isStatic)

        return (
            <>
                {filtered.map(module => (
                    <Box key={module.key} mb={2}>
                        <ModuleCard module={module}/>
                    </Box>                    
                ))}
            </>
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
        <>
            {Array(AMOUNT_OF_CARDS).fill(0).map((_, index) => (
                <Box key={index} mb={2}>
                    <ModuleCardSkeleton />
                </Box>
            ))}
        </>
    )
}

export default ModuleList
