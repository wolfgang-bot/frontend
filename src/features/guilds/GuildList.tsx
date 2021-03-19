import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

import GuildCard, { GuildCardSkeleton } from "../guilds/GuildCard"
import { API } from "../../config/types"
import withStreamSubscription from "../streams/withStreamSubscription"

const useStyles = makeStyles(theme => ({
    guildCard: {
        marginTop: theme.spacing(2)
    }
}))

function GuildList({ data, isLoading }: {
    data: API.Guild[],
    isLoading: boolean
}) {
    const classes = useStyles()

    if (!isLoading) {
        return (
            <>
                {Object.values(data).map(guild => (
                    <GuildCard
                        key={guild.id}
                        guild={guild}
                        className={classes.guildCard}
                    />
                ))}
            </>
        )
    }

    return (
        <>
            {Array(3).fill(3).map((_, i) => (
                <Box mt={2} key={i}>
                    <GuildCardSkeleton
                        className={classes.guildCard}
                    />
                </Box>
            ))}
        </>
    )
}

export default withStreamSubscription(GuildList, "user-guilds", {
    showOverlayIfEmpty: false,
    renderProgressWhileLoading: false
})
