import React from "react"
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core"

import { API } from "../../config/types"
import ArgumentsForm from "../Forms/ArgumentsForm/ArgumentsForm"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

function InstanceConfigDialog({ open, onClose, instance, guild }: {
    open: boolean,
    onClose: (...args: any[]) => void,
    instance: API.ModuleInstance,
    guild: API.Guild
}) {
    const module = useSelector((store: RootState) => store.modules.data[instance.moduleKey])
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{module.key}</DialogTitle>

            <DialogContent>
                <ArgumentsForm
                    args={module.args}
                    guild={guild}
                    currentConfig={instance.config}
                    disabled
                />
            </DialogContent>
        </Dialog>
    )
}

export default InstanceConfigDialog
