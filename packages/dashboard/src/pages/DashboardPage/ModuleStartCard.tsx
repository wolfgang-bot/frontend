import { useRef } from "react"
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardHeader,
    Divider,
    Theme,
    Typography,
    useMediaQuery
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"

import { API } from "../../config/types"
import ArgumentsForm, {
    RefHandle as ArgumentsRefHandle
} from "../../components/Forms/ArgumentsForm/ArgumentsForm"
import api from "../../api"

const useStyles = makeStyles({
    emptyArgs: {
        opacity: .5,
        textAlign: "center"
    }
})

function ModuleStartCard({ module, guild, onBack }: {
    module?: API.Module,
    guild?: API.Guild,
    onBack: () => void
}) {
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))

    const classes = useStyles()
    
    const argsFormRef = useRef<ArgumentsRefHandle>(null)

    const validateArgs = async (args: Record<string, any>) => {
        if (!guild || !module) {
            return
        }

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
        if (!guild || !module) {
            return
        }

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

        onBack()
    }
    
    return (
        <Card variant="outlined">
            <CardActionArea onClick={onBack}>
                <CardHeader
                    disableTypography
                    avatar={<ChevronLeftIcon/>}
                    title={
                        <Typography variant="body1">
                            {`Start Module: ${module?.name}`}
                        </Typography>
                    }
                />
            </CardActionArea>

            <Divider/>

            <Box
                overflow="hidden auto"
                p={2}
                {...({
                    [isSmallScreen ? "maxHeight" : "height"]: 600-52-60
                })}
            >
                {(!guild || !module) ? <></> : (
                    <ArgumentsForm
                        key={module.key}
                        args={module.args}
                        guild={guild}
                        ref={argsFormRef}
                    />
                )}

                {module?.args.length === 0 && (
                    <Box mt={4}>
                        <Typography className={classes.emptyArgs}>
                            No configuration needed
                        </Typography>
                    </Box>
                )}
            </Box>

            <Divider/>

            <Box
                display="flex"
                justifyContent="flex-end"
                p={1}
            >
                <Button onClick={handleSubmit}>
                    Start
                </Button>
            </Box>
        </Card>
    )
}

export default ModuleStartCard
