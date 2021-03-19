import { API } from "../config/types"
import format, { FORMATS } from "./format"

export default class StreamFormatter {
    formatterMap: Partial<
        Record<API.EVENT_STREAM, (data: any) => any>
    > = {
        "user-guilds": format(FORMATS.GUILDS)
    }

    constructor(public args: API.StreamArgs) {}

    format(data: any) {
        const formatter = this.formatterMap[this.args.eventStream]

        if (!formatter) {
            return
        }

        formatter({ data })
    }
}
