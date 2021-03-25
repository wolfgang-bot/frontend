import { useRef } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core"

import { API } from "../../config/types"
import ArgumentsForm, { RefHandle as ArgumentsRefHandle } from "../Forms/ArgumentsForm/ArgumentsForm"
import api from "../../api"

function StartModuleDialog({ open, onClose, module, guild }: {
    open: boolean,
    onClose: (...args: any[]) => void,
    module: API.Module,
    guild: API.Guild
}) {
    const argsFormRef = useRef<ArgumentsRefHandle>(null)

    const validateArgs = async (args: Record<string, any>) => {
        try {
            await api.ws.validateArguments({
                moduleKey: module.key,
                args
            })
        } catch (error) {
            return error.message
        }
    }

    const handleSubmit = async () => {
        const args = argsFormRef.current?.getValues()

        if (!args) {
            throw new Error("Failed to receive arguments")
        }

        const validationError = await validateArgs(args)

        if (validationError) {
            argsFormRef.current?.setErrors(validationError)
            return
        }

        api.ws.startModuleInstance({
            guildId: guild.id,
            moduleKey: module.key,
            args
        })

        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{ module.name }</DialogTitle>

            <DialogContent>
                <ArgumentsForm
                    args={module.args}
                    guild={guild}
                    ref={argsFormRef}
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
