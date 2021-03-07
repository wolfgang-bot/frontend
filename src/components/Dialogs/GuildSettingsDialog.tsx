import React, { useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core"

import { API } from "../../config/types"
import { RootState } from "../../store"
import ArgumentsForm, { RefHandle } from "../Forms/ArgumentsForm/ArgumentsForm"
import { updateConfig as updateConfigAction } from "../../features/moduleInstances/moduleInstancesSlice"
import Logger from "../../utils/Logger"
import opener from "../ComponentOpener"

function GuildSettingsDialog({ open, onClose, guild }: {
    open: boolean,
    onClose: (...args: any[]) => void,
    guild: API.Guild
}) {
    const dispatch = useDispatch()
    
    const module = useSelector((store: RootState) => store.modules.data.settings)
    const instance = useSelector((store: RootState) => store.moduleInstances.guilds[guild.id]?.data.settings)

    const argsFormRef = useRef<RefHandle>(null)

    const updateConfig = async (config: object) => {
        const resultAction = await dispatch(updateConfigAction({
            guildId: guild.id,
            moduleKey: module.key,
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

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Settings</DialogTitle>

            <DialogContent>
                <ArgumentsForm
                    args={module.args}
                    guild={guild}
                    currentConfig={instance.config}
                    ref={argsFormRef}
                />
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default GuildSettingsDialog
