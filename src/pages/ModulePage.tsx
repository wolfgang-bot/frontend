import React, { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress, Grid, Avatar, Typography, List, ListItem, ListItemText, Box, Button } from "@material-ui/core"

import { RootState } from "../store"
import Layout from "../components/Layout/Layout"
import { fetchModules } from "../features/modules/modulesSlice"
import { fetchGuilds, updateConfig as updateConfigAction } from "../features/guilds/guildsSlice"
import ConfigForm, { RefHandle } from "../components/Forms/ConfigForm/ConfigForm"
import { API } from "../config/types"
import Logger from "../utils/Logger"
import opener from "../components/ComponentOpener"

function ModulePage({ renderSidebar }: { renderSidebar?: boolean }) {
    const { key, guildId } = useParams<{
        key: string,
        guildId: string
    }>()

    const configFormRef = useRef<RefHandle>(null)

    const dispatch = useDispatch()

    const moduleStatus = useSelector((store: RootState) => store.modules.status)
    const module = useSelector((store: RootState) => store.modules.data?.[key])
    const moduleError = useSelector((store: RootState) => store.modules.error)

    const guildsStatus = useSelector((store: RootState) => store.guilds.status)
    const guild = useSelector((store: RootState) => store.guilds.data?.[guildId])
    const guildsError = useSelector((store: RootState) => store.guilds.error)

    const handleUpdateConfig = async () => {
        const value = configFormRef.current?.getValues() as API.Config

        if (!value) {
            throw new Error("Failed to receive config from config form")
        }

        const resultAction = await dispatch(updateConfigAction({
            guildId: guild.id,
            value
        })) as any

        if (updateConfigAction.fulfilled.match(resultAction)) {
            opener.openSnackbar("Config updated")
        } else {
            Logger.error(resultAction.error)

            if (typeof resultAction.error === "object") {
                configFormRef.current?.setErrors(resultAction.error)
            }
        }
    }

    useEffect(() => {
        if (moduleStatus === "idle") {
            const api = guildId ? "ws" : "http"
            dispatch(fetchModules(api))
        }
    }, [moduleStatus, dispatch])

    useEffect(() => {
        if (guildId && guildsStatus === "idle") {
            dispatch(fetchGuilds())
        }
    }, [guildsStatus, dispatch, guildId])

    let child = <CircularProgress/>

    if (
        moduleStatus === "success" &&
        (!guildId || guildsStatus === "success")
    ) {
        child = (
            <div>
                <Box mb={4}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Avatar src={module.icon}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">{module.translations.name}</Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Box mb={4}>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <Typography variant="h6">Features</Typography>
                            <List>
                                {module.translations.features.map((feature, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={feature}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h6">Arguments</Typography>
                            <List>
                                {module.translations.args.map(arg => (
                                    <ListItem key={arg.key}>
                                        <ListItemText
                                            primary={arg.name}
                                            secondary={arg.desc}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </Box>

                { guildId && (
                    <div>
                        <Typography variant="h6">Configuration</Typography>
                        <ConfigForm
                            guild={guild}
                            module={module}
                            ref={configFormRef}    
                        />
                        <Button variant="outlined" onClick={handleUpdateConfig}>Save</Button>
                    </div>
                ) }
            </div>
        )
    }
    
    if (
        moduleStatus === "error" ||
        (guildId && guildsStatus === "error")
    ) {
        child = (
            <div>
                {moduleError}
                {guildsError}
            </div>
        )
    }

    return (
        <Layout renderSidebar={renderSidebar}>
            {child}
        </Layout>
    )
}

export default ModulePage