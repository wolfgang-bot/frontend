import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress, Grid, Typography, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import { RootState } from "../store"
import Layout from "../components/Layout/Layout"
import { fetchModules } from "../features/modules/modulesSlice"
import CommandListForModule from "../features/commands/CommandListForModule"
import Title from "../components/Styled/Title"

const useStyles = makeStyles(theme => ({
    icon: {
        borderRadius: "50%",
        width: 32,
        height: 32
    },

    listItem: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(1)
    },

    bullet: {
        width: 20,
        height: 20,
        marginRight: theme.spacing(1)
    }
}))

function ModulePage() {
    const { key, guildId } = useParams<{
        key: string,
        guildId: string
    }>()

    const classes = useStyles()

    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.modules.status)
    const module = useSelector((store: RootState) => store.modules.data?.[key])
    const error = useSelector((store: RootState) => store.modules.error)

    useEffect(() => {
        if (status === "idle") {
            const api = guildId ? "ws" : "http"
            dispatch(fetchModules(api))
        }

        // eslint-disable-next-line
    }, [status, dispatch])

    let child = <CircularProgress/>

    if (status === "success") {
        child = (
            <>
                <Box mt={4}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <img
                                src={module.icon}
                                className={classes.icon}
                                alt="Icon"
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                {module.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs>
                        <Title>Features</Title>
                        {module.features.map((feature, index) => (
                            <Typography
                                key={index}
                                variant="body1"
                                className={classes.listItem}
                            >
                                <ChevronRightIcon className={classes.bullet}/>
                                {feature}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>

                <Title>Commands</Title>
                <CommandListForModule moduleKey={module.key}/>
            </>
        )
    }
    
    if (status === "error") {
        child = (
            <div>{error}</div>
        )
    }

    return (
        <Layout center={status === "pending"}>
            {child}
        </Layout>
    )
}

export default ModulePage
