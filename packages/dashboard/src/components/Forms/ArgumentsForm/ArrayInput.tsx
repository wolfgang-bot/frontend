import React, { useState, useEffect, useRef, useMemo, useContext } from "react"
import { useFormContext, useForm, FormProvider } from "react-hook-form"
import { Button, IconButton, Box, InputLabel, FormHelperText } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Close"
import AddIcon from "@material-ui/icons/Add"

import { API } from "../../../config/types"
import { ArgumentInputComponent } from "./ArgumentInput"
import { DefaultValuesContext } from "./ArgumentsForm"
import { pick } from "../../../utils"

function ArrayInput({ arg, guild, inputComponent, className, disabled }: {
    arg: API.Argument,
    guild: API.Guild,
    inputComponent: ArgumentInputComponent,
    className?: string,
    disabled?: boolean
}) {
    const defaultValuesContext = useContext(DefaultValuesContext)
    
    const { register, setValue, errors } = useFormContext()

    const defaultValues = useMemo(() => {
        const defaultValues: any[] = defaultValuesContext[arg.key] || arg.defaultValue

        if (!defaultValues) {
            return {}
        }

        return Object.fromEntries(defaultValues.map((value, i) => [i, value]))
    }, [arg.defaultValue, arg.key, defaultValuesContext])

    const form = useForm({ defaultValues })

    const inputIdCounter = useRef(0)

    const initialInputIds = useMemo(
        () => Object.keys(defaultValues).map(() => inputIdCounter.current++),
        [defaultValues]
    )

    const [inputIds, setInputIds] = useState(initialInputIds)

    const handleInputAdd = () => {
        setInputIds([
            ...inputIds,
            inputIdCounter.current++
        ])
    }

    const handleInputRemove = (id: number) => {
        const newValues = form.watch()
        delete newValues[id]
        setValue(arg.key, Object.values(newValues))

        setInputIds(inputIds.filter(_id => _id !== id))
    }

    useEffect(() => {
        /**
         * An empty array as the form's value triggers the default-value, hence the
         * form's value and the real value might be out of sync. (it's a workaround)
         */
        const values = pick(form.watch(), inputIds)
        const newValuesArray = Object.values(values)
        setValue(arg.key, newValuesArray)

        // eslint-disable-next-line
    }, [form.watch()])
    
    useEffect(() => {
        register(arg.key)
    }, [arg.key, register])

    const hasError = arg.key in errors
    const helperText = hasError ? errors[arg.key]?.message : arg.desc

    const formControlProps = { error: hasError, disabled }

    return (
        <FormProvider {...form}>
            <InputLabel {...formControlProps}>{arg.name}</InputLabel>
            <FormHelperText {...formControlProps}>{helperText}</FormHelperText>

            {inputIds.map(id => (
                <Box
                    display="flex"
                    alignItems="center"
                    key={id}
                    className={className}
                >
                    <Box mr={2} flexGrow={1}>
                        {React.createElement(inputComponent, {
                            arg: {
                                ...arg,
                                key: id.toString(),
                                desc: "",
                                name: ""
                            },
                            guild,
                            disabled
                        })}
                    </Box>

                    {(arg.allowEmptyArray || inputIds.length > 1) && (
                        <IconButton
                            onClick={() => handleInputRemove(id)}
                            size="small"
                            disabled={disabled}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            ))}

            <Box mb={2}>
                <Button
                    onClick={handleInputAdd}
                    variant="outlined"
                    startIcon={<AddIcon/>}
                    disabled={disabled}
                >
                    Add
                </Button>
            </Box>
        </FormProvider>
    )
}

export default ArrayInput
