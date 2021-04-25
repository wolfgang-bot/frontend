import { useRef } from "react"
import { Button, Box } from "@material-ui/core"

import { API } from "../../config/types"
import ArgumentsForm, { RefHandle as ArgumentsRefHandle } from "../Forms/ArgumentsForm/ArgumentsForm"
import api from "../../api"

function ModuleStartForm({ module, guild, onSubmit = () => {} }: {
    module: API.Module,
    guild: API.Guild,
    onSubmit?: () => void
}) {
    const argsFormRef = useRef<ArgumentsRefHandle>(null)

    const validateArgs = async (args: Record<string, any>) => {
        try {
            await api.ws.validateArguments({
                guildId: guild.id,
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

        onSubmit()
    }

    return (
        <>
            <Box mb={4}>
                <ArgumentsForm
                    args={module.args}
                    guild={guild}
                    ref={argsFormRef}
                />
            </Box>

            <Box display="flex" justifyContent="flex-end">
                <Button 
                    onClick={handleSubmit} 
                    color="primary"
                >
                    Start
                </Button>
            </Box>
        </>
    )
}

export default ModuleStartForm
