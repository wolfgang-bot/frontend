import { List } from "@material-ui/core"
import { API } from "../../config/types"
import withStreamSubscription from "../streams/withStreamSubscription"
import GuildListItem from "./GuildListItem"

function GloablGuildList({ data }: {
    data: API.Guild[]
}) {
    return (
        <List>
            {data.map(guild => (
                <GuildListItem
                    guild={guild}
                    key={guild.id}
                />
            ))}
        </List>
    )
}

export default withStreamSubscription(GloablGuildList, "guilds-resources")
