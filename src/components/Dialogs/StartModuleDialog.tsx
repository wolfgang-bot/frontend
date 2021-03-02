import React, { useRef } from "react"
import { useDispatch } from "react-redux"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core"

import { API } from "../../config/types"
import ArgumentsForm, { RefHandle as ArgumentsRefHandle } from "../Forms/ArgumentsForm/ArgumentsForm"
import ConfigForm, { RefHandle as ConfigRefHandle } from "../Forms/ConfigForm/ConfigForm"
import { updateConfig as updateConfigAction } from "../../features/guilds/guildsSlice"
import Logger from "../../utils/Logger"
import api from "../../api"

function StartModuleDialog({ open, onClose, module, guild }: {
    open: boolean,
    onClose: (...args: any[]) => void,
    module: API.Module,
    guild: API.Guild
}) {
    const dispatch = useDispatch()

    const argsFormRef = useRef<ArgumentsRefHandle>(null)
    const configFormRef = useRef<ConfigRefHandle>(null)

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
        const formValues = argsFormRef.current?.getValues()
        const config = configFormRef.current?.getValues()
        
        if (!formValues || !config) {
            throw new Error("Failed to receive form")
        }
        
        const args = module.translations.args.map(({ key }) => formValues[key])

        const success = await updateConfig(config)
        
        if (!success) {
            return
        }

        api.ws.startModuleInstance(guild.id, module.key, args)

        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{ module.translations.name }</DialogTitle>

            <DialogContent>
                <ArgumentsForm
                    args={module.translations.args}
                    guild={guild}
                    ref={argsFormRef}
                />

                <ConfigForm
                    guild={guild}
                    module={module}
                    ref={configFormRef}
                />
            </DialogContent>

            <DialogActions>
                <Button 
                    onClick={handleSubmit} 
                    color="primary"
                >
                    Start
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default StartModuleDialog
