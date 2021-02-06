import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core"

import { API } from "../../config/types"
import ArgumentsForm from "../Forms/ArgumentsForm/ArgumentsForm"

function StartModuleDialog({ open, onClose, module, guild }: {
    open: boolean,
    onClose: (...args: any) => void,
    module: API.Module,
    guild: API.Guild
}) {
    const form = useForm()

    const handleSubmit = () => {
        onClose({
            args: Object.values(form.getValues())
        })
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
                </FormProvider>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleSubmit}>Start</Button>
            </DialogActions>
        </Dialog>
    )
}

export default StartModuleDialog