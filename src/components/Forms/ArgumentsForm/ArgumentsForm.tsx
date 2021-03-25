import React, { ForwardedRef, useImperativeHandle, useMemo } from "react"
import { useForm, FormProvider } from "react-hook-form"

import { API } from "../../../config/types"
import ArgumentInput from "./ArgumentInput"

export type RefHandle = {
    getValues: () => Record<string, any>,
    setErrors: (errors: Record<string, string>) => void
}

type Props = {
    args: API.Argument[],
    guild: API.Guild,
    currentConfig?: Record<string, any>
}

function getDefaultValues(args: API.Argument[], config?: Record<string, any>) {
    return Object.fromEntries(
        args.map(arg => {
            const value =
                config?.[arg.key] ? config[arg.key] :
                arg.defaultValue ? arg.defaultValue :
                undefined
            return [arg.key, value]
        })
            .filter(Boolean)
    )
}

function ArgumentsForm({ args, guild, currentConfig }: Props, ref?: ForwardedRef<RefHandle>) {
    const form = useForm({
        defaultValues: getDefaultValues(args, currentConfig)
    })

    const inputs = useMemo(() => (
        args.map(arg => (
            <ArgumentInput arg={arg} guild={guild} key={arg.key} />
        )) 
    ), [args, guild])

    useImperativeHandle(ref, () => ({
        getValues: form.getValues,
        setErrors: (errors) => {
            Object.entries(errors).forEach(([key, message]) => {
                form.setError(key, { message })
            })
        }
    }), [form])

    return (
        <FormProvider {...form}>
            {inputs}
        </FormProvider>
    )
}

export default React.forwardRef<RefHandle, Props>(ArgumentsForm)
