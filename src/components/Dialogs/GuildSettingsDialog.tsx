import React, { useRef } from "react"
import { useDispatch } from "react-redux"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core"

import { API } from "../../config/types"
import ConfigForm, { RefHandle } from "../Forms/ConfigForm/ConfigForm"
import { updateConfig as updateConfigAction } from "../../features/guilds/guildsSlice"
import Logger from "../../utils/Logger"

function GuildSettingsDialog({ open, onClose, guild }: {
    open: boolean,
    onClose: (...args: any[]) => void,
    guild: API.Guild
}) {
    const dispatch = useDispatch()

    const configFormRef = useRef<RefHandle>(null)

    const updateConfig = async (value: API.Config) => {
        const resultAction = await dispatch(updateConfigAction({
            guildId: guild.id,
            value
        })) as any

        if (updateConfigAction.fulfilled.match(resultAction)) {
            return true
        } else {
            Logger.error(resultAction.error)

            if (typeof resultAction.error === "object") {
                configFormRef.current?.setErrors(resultAction.error)
            }

            return false
        }
    }

    const handleSubmit = async () => {
        const config = configFormRef.current?.getValues()

        if (!config) {
            throw new Error("Failed to receive config from config form")
        }

        const success = await updateConfig(config)

        if (success) {
            onClose()
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Settings</DialogTitle>

            <DialogContent>
                <ConfigForm
                    guild={guild}
                    module={{
                        key: "settings"
                    } as API.Module}
                    ref={configFormRef}
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
