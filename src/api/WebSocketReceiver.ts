import { Socket } from "socket.io-client"

import { API } from "../config/types"
import store from "../store"
import { updateInstances } from "../features/moduleInstances/moduleInstancesSlice"

class WebSocketReceiver {
    socket: Socket

    constructor(socket: Socket) {
        this.socket = socket

        this.attachEventReceivers()
    }

    attachEventReceivers() {
        this.socket.on("push:module-instances", this.receiveModuleInstances)
    }

    receiveModuleInstances(instances: API.ModuleInstance[]) {
        store.dispatch(updateInstances(instances))
    }
}

export default WebSocketReceiver