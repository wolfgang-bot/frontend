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

    const handleSubmit = async () => {
        const formValues = argsFormRef.current?.getValues()

        if (!formValues) {
            throw new Error("Failed to receive arguments")
        }
        
        const args = module.translations.args.map(({ key }) => formValues[key])

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
