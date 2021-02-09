import React, { useMemo, useState, useEffect, useImperativeHandle, ForwardedRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useForm, FormProvider } from "react-hook-form"
import { Paper, CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { API } from "../../../config/types"
import { RootState } from "../../../store"
import Title from "./Title"
import Input from "./Input"
import {
    createNestedElements,
    createNestedObject,
    flattenObject,
    convertDescriptiveObjectToVanillaObject
} from "../../../utils"
import { fetchConfig } from "../../../features/guilds/guildsSlice"

type Props = {
    guild: API.Guild,
    module: API.Module
}

export type RefHandle = {
    getValues: () => object,
    setErrors: (errors: object) => void
}

const useStyles = makeStyles(theme => ({
    titleWrapper: {
        margin: `${theme.spacing(2)}px 0`
    },

    container: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(6),
    },

    inputWrapper: {
        margin: `${theme.spacing(2)}px 0`,

        "&:first-child": {
            marginTop: 0
        },

        "&:last-child": {
            marginBottom: 0
        }
    },

    inputLabelWrapper: {
        marginBottom: theme.spacing(.5)
    },

    inputLabel: {
        lineHeight: "unset"
    }
}))

function ConfigForm({ guild, module }: Props, ref?: ForwardedRef<RefHandle>) {
    const classes = useStyles()

    const dispatch = useDispatch()

    const config = useSelector((store: RootState) => store.guilds.data[guild.id]?.config.data)
    const data = useSelector((store: RootState) => store.guilds.data[guild.id]?.config.data?.value?.[module.name])
    const status = useSelector((store: RootState) => store.guilds.data[guild.id]?.config.status)
    const error = useSelector((store: RootState) => store.guilds.data[guild.id]?.config.error)

    const [hasFormValues, setHasFormValue] = useState(false)

    const form = useForm()

    const [children, keys] = useMemo(() => {
        if (!data) {
            return []
        }

        return createNestedElements(data, {
            title: Title,
            leaf: Input,
            container: ({ children }) => (
                <Paper className={classes.container} variant="outlined">
                    {children}
                </Paper>
            )
        })

        // eslint-disable-next-line
    }, [data])

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchConfig(guild.id))
        } else if (status === "success" && !hasFormValues) {
            form.reset(keys)
            setHasFormValue(true)
        }
    }, [status, dispatch, guild.id, keys, hasFormValues, form])

    useImperativeHandle(ref, () => ({
        getValues: () => {
            const newConfig = convertDescriptiveObjectToVanillaObject(config)
            newConfig[module.name] = createNestedObject(form.getValues())
            return newConfig
        },

        setErrors: (errors: Record<string, any> | string) => {
            if (errors && typeof errors === "object") {
                const flattened = flattenObject(errors[module.name])
                
                for (let key in flattened) {
                    form.setError(key, {
                        message: flattened[key] 
                    })
                }
            }
        }
    }))

    if (status === "error") {
        return <div>{ error }</div>
    }

    if (status === "success" && hasFormValues) {
        return (
            <FormProvider {...form}>
                {children}
            </FormProvider>
        )
    }

    return <CircularProgress/>
}

const ConfigFormWithRef = React.forwardRef<RefHandle, Props>(ConfigForm)

export default ConfigFormWithRef