import { API } from "../config/types"
import format, { FORMATS } from "./format"

export default class StreamFormatter {
    formatterMap: Partial<
        Record<API.EVENT_STREAM, (data: any) => any>
    > = {
        "user-guilds": format(FORMATS.GUILDS),
        "user-message-leaderboard": ({ data }: { data: [API.User][] }) =>
            format(FORMATS.USERS)({ data: data.map(([user]) => user) })
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
