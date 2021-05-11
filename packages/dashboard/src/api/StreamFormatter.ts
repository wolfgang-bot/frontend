import { API } from "../config/types"
import format, { FORMATS } from "./format"

export default class StreamFormatter {
    formatterMap: Partial<
        Record<API.EVENT_STREAM, (data: any) => any>
    > = {
        "user-guilds": format(FORMATS.GUILDS),
        "guilds-resources": format(FORMATS.GUILDS),
        "user-message-leaderboard": this.leaderboardFormatter.bind(this),
        "user-voice-leaderboard": this.leaderboardFormatter.bind(this)
    }

    constructor(public args: API.StreamArgs) {}

    leaderboardFormatter({ data }: { data: [API.User][] }) {
        return format(FORMATS.USERS)({
            data: data.map(([user]) => user)
        })
    }

    format(data: any) {
        const formatter = this.formatterMap[this.args.eventStream]

        if (!formatter) {
            return
        }
        
        formatter({ data })
    }
}
