import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Grid } from "@material-ui/core"

import { RootState } from "../../store"
import { fetchModules } from "./modulesSlice"
import ModuleCard from "./ModuleCard"
import * as Skeletons from "../../components/Skeletons"

function ModuleList() {
    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.modules.status)
    const data = useSelector((store: RootState) => store.modules.data)
    const error = useSelector((store: RootState) => store.modules.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchModules("http"))
        }
    }, [status, dispatch])

    if (status === "success") {
        return (
            <Grid container spacing={2}>
                {Object.values(data).map(module => (
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

    return <Skeletons.ModuleList/>
}

export default ModuleList