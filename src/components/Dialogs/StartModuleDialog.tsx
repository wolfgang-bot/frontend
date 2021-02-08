import React, { useRef } from "react"
import { useDispatch } from "react-redux"
import { useForm, FormProvider } from "react-hook-form"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core"

import { API } from "../../config/types"
import ArgumentsForm from "../Forms/ArgumentsForm/ArgumentsForm"
import ConfigForm, { RefHandle } from "../Forms/ConfigForm/ConfigForm"
import api from "../../api"
import { setConfig } from "../../features/guilds/guildsSlice"

function StartModuleDialog({ open, onClose, module, guild }: {
    open: boolean,
    onClose: (...args: any[]) => void,
    module: API.Module,
    guild: API.Guild
}) {
    const dispatch = useDispatch()

    const configFormRef = useRef<RefHandle>(null)

    const form = useForm()

    const updateConfig = async (value: API.Config) => {
        try {
            const res = await api.ws.updateConfig(guild.id, value)
            if (res.data) {
                dispatch(setConfig({
                    guildId: guild.id,
                    value: res.data
                }))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async () => {
        const args = Object.values(form.getValues())
        const config = configFormRef.current?.getValues()

        if (!config) {
            throw new Error("Failed to receive config from config form")
        }

        await updateConfig(config)

        api.ws.startModuleInstance(guild.id, module.name, args)

        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{ module.name }</DialogTitle>

            <DialogContent>
                <FormProvider {...form}>
                    <ArgumentsForm
                        args={module.translations.args}
                        guild={guild}
                    />

                    <ConfigForm
                        guild={guild}
                        module={module}
                        ref={configFormRef}
                    />
                </FormProvider>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleSubmit}>Start</Button>
            </DialogActions>
        </Dialog>
    )
}

export default StartModuleDialog