import React, { useState, useEffect, useRef, useReducer } from "react"
import { useTheme } from "@material-ui/core"

import { createListeners } from "../../utils"
import Emittable from "../../utils/Emittable"
import ComponentHandle from "./ComponentHandle"
import createSnackbarOpener from "./snackbar"
import createDialogOpener from "./dialog"

type OpenerCreator = (...args: any[]) => Opener
type Opener = (...args: any[]) => ComponentHandle<any, any>

const openers: Record<string, OpenerCreator> = {
    Snackbar: createSnackbarOpener,
    Dialog: createDialogOpener
}

const methods: Record<string, Opener> = {}

function ComponentOpener() {
    const theme = useTheme()

    const eventTarget = useRef<Emittable>(new Emittable())

    const [handles, setHandles] = useState<ComponentHandle<any, any>[]>([])

    // eslint-disable-next-line
    const [updateKey, update] = useReducer(key => key + 1, 0)

    const close = (handle: ComponentHandle<any, any>) => {
        handle.isOpen = false
        setHandles([...handles])

        setTimeout(
            () => eventTarget.current.dispatchEvent("removeComponent", handle),
            theme.transitions.duration.leavingScreen
        )
    }

    const remove = (handle: ComponentHandle<any, any>) => {
        // const newComponent = handles.filter(({ id }) => handle.id !== id)
        // setHandles(newComponent)
    }

    useEffect(() => {
        const open = (newHandle: ComponentHandle<any, any>) => {
            setHandles([...handles, newHandle])
            return newHandle
        }

        for (let name in openers) {
            methods["open" + name] = openers[name](open)
        }

        const removeListeners = handles.map(handle => createListeners(handle, [
            ["update", update],
            ["close", () => requestAnimationFrame(() => close(handle))]
        ]))

        return () => removeListeners.forEach(fn => fn())
    })

    useEffect(() => {
        return createListeners(eventTarget.current, [
            ["removeComponent", remove]
        ])
    })

    return (
        <>
            {handles.map((handle) => (
                React.createElement(handle.component, {
                    open: handle.isOpen,
                    onClose: (data: any) => handle.dispatchEvent("close", data),
                    key: handle.id,
                    ...handle.data
                })
            ))}
        </>
    )
}

export default ComponentOpener

export const opener = methods