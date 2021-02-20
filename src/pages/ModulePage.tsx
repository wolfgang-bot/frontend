import React, { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress, Grid, Typography, Box, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import { RootState } from "../store"
import Layout from "../components/Layout/Layout"
import { fetchModules } from "../features/modules/modulesSlice"
import { fetchGuilds, updateConfig as updateConfigAction } from "../features/guilds/guildsSlice"
import ConfigForm, { RefHandle } from "../components/Forms/ConfigForm/ConfigForm"
import { API } from "../config/types"
import Logger from "../utils/Logger"
import opener from "../components/ComponentOpener"
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

        // eslint-disable-next-line
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
            <>
                <Box mt={4}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <img src={module.icon} className={classes.icon}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                {module.translations.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs>
                        <Title>Features</Title>
                        {module.translations.features.map((feature, index) => (
                            <Typography variant="body1" className={classes.listItem}>
                                <ChevronRightIcon className={classes.bullet}/>
                                {feature}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>

                <Title>Commands</Title>
                <CommandListForModule moduleKey={module.key}/>

                { guildId && (
                    <>
                        <Title>Configuration</Title>
                        <ConfigForm
                            guild={guild}
                            module={module}
                            ref={configFormRef}    
                        />
                        <Button variant="outlined" onClick={handleUpdateConfig}>Save</Button>
                    </>
                ) }
            </>
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
        <Layout>
            {child}
        </Layout>
    )
}

export default ModulePage