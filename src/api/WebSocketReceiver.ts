import { Socket } from "socket.io-client"

import { API } from "../config/types"
import store from "../store"
import { data as dataAction } from "../features/streams/streamsSlice"
import Logger from "../utils/Logger"

class WebSocketReceiver {
    socket: Socket

    constructor(socket: Socket) {
        this.socket = socket

        this.attachEventReceivers()
    }

    attachEventReceivers() {
        this.addReceiver("push:stream", this.receiveStreamData)
    }

    addReceiver(event: string, receiver: (...args: any[]) => void) {
        this.socket.on(event, (...args: any[]) => {
            Logger.info(`%c[${event}]`, "color: darkviolet", ...args)
            receiver(...args)
        })
    }

    receiveStreamData(args: API.StreamArgs, data: any) {
        store.dispatch(dataAction({ args, data }))
    }
}

export default WebSocketReceiver
