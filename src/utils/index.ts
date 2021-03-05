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
