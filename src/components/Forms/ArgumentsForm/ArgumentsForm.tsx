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

function ArgumentsForm({ args, guild }: Props, ref?: ForwardedRef<RefHandle>) {
    const form = useForm()

    useImperativeHandle(ref, () => ({
        getValues: form.getValues
    }), [args, guild])
    
    return (
        <FormProvider {...form}>
            { args.map(arg => (
                <ArgumentInput arg={arg} guild={guild} key={arg.name}/>
            )) }
        </FormProvider>
    )
}

export default React.forwardRef<RefHandle, Props>(ArgumentsForm)
