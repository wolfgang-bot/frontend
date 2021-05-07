import React from "react"
import {
    Card,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    CardHeader,
    Divider
} from "@material-ui/core"

import withStreamSubscription from "../../features/streams/withStreamSubscription"
import { API } from "../../config/types"
import Avatar from "../../components/User/Avatar"
import { millisecondsToHours, roundToPlaces } from "./utils"

function LeaderboardItem({ user, score }: { user: API.User, score: number}) {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar user={user}/>
            </ListItemAvatar>
            <ListItemText
                primary={user.username}
                secondary={`${roundToPlaces(millisecondsToHours(score), 2)} Hours`}
            />
        </ListItem>
    )
}

function UserVoiceLeaderboard({ data }: { data: [API.User, number][] }) {
    return (
        <Card variant="outlined">
            <CardHeader
                title="Longest In Voicechat"
                titleTypographyProps={{
                    variant: "body1"
                }}
            />
            <Divider/>
            <List>
                {data.map(([user, score]) => (
                    <LeaderboardItem user={user} score={score} key={user.id}/>
                ))}
            </List>
        </Card>
    )
}

export default withStreamSubscription(
    UserVoiceLeaderboard,
    "user-voice-leaderboard"
)
