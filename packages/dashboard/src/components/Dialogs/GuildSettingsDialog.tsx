import React, { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Dialog, DialogContent, DialogActions, Button } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

import { API } from "../../config/types"
import { RootState } from "../../store"
import ArgumentsForm, { RefHandle } from "../Forms/ArgumentsForm/ArgumentsForm"
import { selectInstanceByModuleKey, updateConfig as updateConfigAction } from "../../features/moduleInstances/moduleInstancesSlice"
import Logger from "../../utils/Logger"
import opener from "../ComponentOpener"
import api from "../../api"
import withStreamSubscription from "../../features/streams/withStreamSubscription"
import { fetchModules } from "../../features/modules/modulesSlice"
import DialogTitle from "../Styled/DialogTitle"

function GuildSettingsDialog({ open, onClose, guild }: {
    open: boolean,
    onClose: (...args: any[]) => void,
    guild: API.Guild
}) {
    const dispatch = useDispatch()
    
    const module = useSelector((store: RootState) => store.modules.data.settings)
    const status = useSelector((store: RootState) => store.modules.status)
    const error = useSelector((store: RootState) => store.modules.error)
    const instance = useSelector(selectInstanceByModuleKey(guild.id, "settings"))

    if (!instance) {
        throw new Error("Could not find instance of module 'settings'")
    }

    const argsFormRef = useRef<RefHandle>(null)

    const validateArguments = async (args: Record<string, any>) => {
        try {
            await api.ws.validateArguments({
                guildId: guild.id,
                moduleKey: "settings",
                args
            })
        } catch (error) {
            return error.message
        }
    }

    const updateConfig = async (config: object) => {
        const validationError = await validateArguments(config)

        if (validationError) {
            argsFormRef.current?.setErrors(validationError)
            return
        }
        
        const resultAction = await dispatch(updateConfigAction({
            guildId: guild.id,
            instanceId: instance.id,
            value: config
        })) as any

        if (updateConfigAction.fulfilled.match(resultAction)) {
            return true
        }

        Logger.error(resultAction.error)

        return false
    }

    const handleSubmit = async () => {
        const newConfig = argsFormRef.current?.getValues()

        if (!newConfig) {
            throw new Error("Failed to receive arguments")
        }

        const success = await updateConfig(newConfig)

        if (success) {
            opener.openSnackbar("Success")
            onClose()
        }
    }

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchModules({
                guildId: guild.id
            }))
        }
    }, [status, dispatch, guild.id])

    let child = <GuildSettingsDialogSkeleton/>

    if (status === "success") {
        child = (
            <ArgumentsForm
                args={module.args}
                guild={guild}
                currentConfig={instance.config}
                ref={argsFormRef}
            />
        )
    }

    if (status === "error") {
        child = error
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle onClose={onClose}>Settings</DialogTitle>

            <DialogContent dividers>
                { child }
            </DialogContent>

            <DialogActions>
                <Button onClick={handleSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

function GuildSettingsDialogSkeleton() {
    return (
        <>
            {Array(4).fill(0).map((_, i) => (
                <Skeleton
                    width={500}
                    height={50}
                    key={i}
                />
            ))}
        </>
    )
}

export default withStreamSubscription(
    GuildSettingsDialog,
    "guild-module-instances",
    {
        showOverlayIfEmpty: false
    }
)
