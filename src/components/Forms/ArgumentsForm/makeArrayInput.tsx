import React, { useState, useEffect, useRef, useMemo } from "react"
import { useFormContext, useForm, FormProvider } from "react-hook-form"
import { Button, IconButton, Box, InputLabel, FormHelperText } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Close"
import AddIcon from "@material-ui/icons/Add"

import type ArgumentInput from "./ArgumentInput"
import { API } from "../../../config/types"

type InputProps = React.ComponentProps<typeof ArgumentInput>
type InputComponent = React.FunctionComponent<InputProps>

function ArrayInput({ arg, guild, inputComponent, className }: {
    arg: API.Argument,
    guild: API.Guild,
    inputComponent: InputComponent,
    className?: string
}) {
    const defaultValues = useMemo(() => {
        if (!arg.defaultValue) {
            return {}
        }

        return Object.fromEntries(
            (arg.defaultValue as any[]).map((value, i) => [i, value])
        )
    }, [])

    const { register, setValue } = useFormContext()

    const form = useForm({ defaultValues })

    const inputIdCounter = useRef(0)
    const [inputIds, setInputIds] = useState(
        Object.keys(defaultValues).map(() => inputIdCounter.current++)
    )

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
        const newValuesArray = Object.values(form.watch())
        setValue(arg.key, newValuesArray)
    }, [form.watch()])
    
    useEffect(() => {
        register(arg.key)
    }, [])

    return (
        <FormProvider {...form}>
            <InputLabel>{arg.name}</InputLabel>
            <FormHelperText>{arg.desc}</FormHelperText>

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
                            guild
                        })}
                    </Box>

                    {inputIds.length > 1 && (
                        <IconButton onClick={() => handleInputRemove(id)} size="small">
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
                >
                    Add
                </Button>
            </Box>
        </FormProvider>
    )
}

function makeArrayInput(inputComponent: InputComponent) {
    return (props: InputProps) => (
        <ArrayInput inputComponent={inputComponent} {...props}/>
    )
}
export default makeArrayInput