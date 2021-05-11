import { List } from "@material-ui/core"
import { API } from "../../config/types"
import withStreamSubscription from "../streams/withStreamSubscription"
import GuildListItem from "./GuildListItem"

type Props = React.ComponentProps<typeof List> & {
    data: API.Guild[],
    isLoading: boolean
}

function GlobalGuildList({ data, isLoading, ...props }: Props) {
    return (
        <List {...props}>
            {data.map(guild => (
                <GuildListItem
                    guild={guild}
                    key={guild.id}
                />
            ))}
        </List>
    )
}

export default withStreamSubscription(GlobalGuildList, "guilds-resources")
