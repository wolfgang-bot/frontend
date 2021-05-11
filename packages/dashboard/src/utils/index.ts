import { LoadingState } from "../config/types"
import Emittable, { EventListener } from "./Emittable"

/**
 * Attach the listeners to the event target and return a function which removes them.
 */
export function createListeners(target: EventTarget | Emittable, events: Array<[string, EventListener]>) {
    events.forEach(([name, listener]) => {
        target.addEventListener(name, listener)
    })

    return () => events.forEach(([name, listener]) => {
        target.removeEventListener(name, listener)
    })
}

/**
 * Copy text to the clipboard
 */
export async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch {
        return false
    }
}

/**
 * Pick a list of keys from an object
 */
export function pick<T extends Record<string, any>>(source: T, keys: (keyof T)[]) {
    return Object.fromEntries(
        keys.map(key => [key, source[key]])
    )
}

/**
 * Merge multiple API status into a single status
 */
export function mergeStatus(...args: LoadingState[]): LoadingState {
    const isIdle = args.every(status => status === "idle")
    const isSuccess = args.every(status => status === "success")
    const isError = args.some(status => status === "error")
    const isPending = args.some(status => status === "pending")
    return (
        isIdle ? "idle" :
        isSuccess ? "success" :
        isError ? "error" :
        isPending ? "pending" :
        "error"
    )
}
