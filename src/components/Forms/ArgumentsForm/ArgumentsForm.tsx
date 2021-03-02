import React, { ForwardedRef, useImperativeHandle } from "react"
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

    useImperativeHandle(ref, () => ({
        getValues: form.getValues
    }), [args, guild, form.getValues])
    
    return (
        <FormProvider {...form}>
            { args.map(arg => (
                <ArgumentInput arg={arg} guild={guild} key={arg.name}/>
            )) }
        </FormProvider>
    )
}

export default React.forwardRef<RefHandle, Props>(ArgumentsForm)
