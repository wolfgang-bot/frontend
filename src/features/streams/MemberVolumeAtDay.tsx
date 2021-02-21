import { useMemo } from "react"
import { Box, Grid } from "@material-ui/core"
import ChevronUpIcon from "@material-ui/icons/KeyboardArrowUp"
import ChevronDownIcon from "@material-ui/icons/KeyboardArrowDown"
import { makeStyles } from "@material-ui/core/styles"

import { API, EVENT_TYPES } from "../../config/types"
import withStreamSubscription from "./withStreamSubscription"
import { roundToLastFullDay, getTimestampsBetween } from "./utils"

const useStyles = makeStyles(theme => ({
    success: {
        color: theme.palette.success.main
    },

    error: {
        color: theme.palette.error.main
    }
}))

function MemberVolumeAtDay({ data, timestamp = Date.now() }: {
    data: API.Event<API.MemberEventMeta>[],
    timestamp?: number
}) {
    const classes = useStyles()
    
    const [amountUp, amountDown] = useMemo(() => {
        const to = timestamp
        const from = roundToLastFullDay(to)

        const eventsToday = getTimestampsBetween(data, from, to)

        let amountUp = 0, amountDown = 0

        for (let event of eventsToday) {
            if (event.type === EVENT_TYPES.GUILD_MEMBER_ADD) {
                amountUp++
            } else if (event.type === EVENT_TYPES.GUILD_MEMBER_REMOVE) {
                amountDown++
            }
        }

        return [amountUp, amountDown]
    }, [data, timestamp])

    return (
        <Grid container spacing={2}>
            <Grid item>
                <Box
                    display="flex"
                    alignItems="center"
                    className={classes.success}
                >
                    <ChevronUpIcon/>
                    <Box>{amountUp}</Box>
                </Box>
            </Grid>
            
            <Grid item>
                <Box
                    display="flex"
                    alignItems="center"
                    className={classes.error}
                >
                    <Box>{amountDown}</Box>
                    <ChevronDownIcon/>
                </Box>
            </Grid>
        </Grid>
    )
}

export default withStreamSubscription(MemberVolumeAtDay, "members")