import Emittable from "../../utils/Emittable"

class ComponentHandle <T, K = void> extends Emittable {
    static idCounter: number = 0

    id: number
    component: T
    data: K
    isOpen: boolean

    constructor({ component, data, isOpen = true }: {
        component: T,
        data: K,
        isOpen?: boolean
    }) {
        super()

        this.id = ComponentHandle.idCounter++
        this.component = component
        this.data = data
        this.isOpen = isOpen
    }

    setData(data: K) {
        this.data = { ...this.data, ...data }
        this.dispatchEvent("update")
    }
}

export default ComponentHandle