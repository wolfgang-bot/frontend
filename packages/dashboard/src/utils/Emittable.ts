export type EventListener = (...args: any) => void

class Emittable {
    listeners: Record<string, EventListener[]> = {}

    addEventListener(event: string, listener: EventListener) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }

        this.listeners[event].push(listener)
    }

    removeEventListener(event: string, listener: EventListener) {
        if (this.listeners[event]) {
            const index = this.listeners[event].findIndex(fn => fn === listener)
            this.listeners[event].splice(index, 1)
        }
    }

    dispatchEvent(event: string, data: any = {}) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(fn => fn(data))
        }
    }
}

export default Emittable