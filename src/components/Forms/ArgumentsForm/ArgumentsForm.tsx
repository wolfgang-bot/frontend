import React, { ForwardedRef, useImperativeHandle, useMemo } from "react"
import { useForm, FormProvider } from "react-hook-form"

import { API } from "../../../config/types"
import ArgumentInput from "./ArgumentInput"

export type RefHandle = {
    getValues: () => Record<string, any>
}

type Props = {
    args: API.Argument[],
    guild: API.Guild
}

function getDefaultValuesFromArgs(args: API.Argument[]) {
    return Object.fromEntries(
        args.map(arg => arg.defaultValue && [arg.key, arg.defaultValue])
            .filter(Boolean)
    )
}

function ArgumentsForm({ args, guild }: Props, ref?: ForwardedRef<RefHandle>) {
    const form = useForm({
        defaultValues: getDefaultValuesFromArgs(args)
    })

    const inputs = useMemo(() => (
        args.map(arg => (
            <ArgumentInput arg={arg} guild={guild} key={arg.key} />
        )) 
    ), [args, guild])

    useImperativeHandle(ref, () => ({
        getValues: form.getValues
    }), [form.getValues])

    return (
        <FormProvider {...form}>
            {inputs}
        </FormProvider>
    )
}

export default React.forwardRef<RefHandle, Props>(ArgumentsForm)
