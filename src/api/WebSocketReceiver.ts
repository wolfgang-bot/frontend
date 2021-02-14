import { Socket } from "socket.io-client"

import { API } from "../config/types"
import store from "../store"
import { updateInstances } from "../features/moduleInstances/moduleInstancesSlice"
import Logger from "../utils/Logger"

class WebSocketReceiver {
    socket: Socket

    constructor(socket: Socket) {
        this.socket = socket

        this.attachEventReceivers()
    }

    attachEventReceivers() {
        this.addReceiver("push:stream/module-instances", this.receiveModuleInstances)
    }

    addReceiver(event: string, receiver: (...args: any[]) => void) {
        this.socket.on(event, (...args: any[]) => {
            Logger.info(`%c[${event}]`, "color: darkviolet", ...args)
            receiver(...args)
        })
    }

    /**
     * @listens push:stream/module-instances
     */
    receiveModuleInstances(instances: API.ModuleInstance[]) {
        store.dispatch(updateInstances(instances))
    }
}

export default WebSocketReceiver