import { useMemo } from "react"
import { Box, Grid } from "@material-ui/core"
import ChevronUpIcon from "@material-ui/icons/KeyboardArrowUp"
import ChevronDownIcon from "@material-ui/icons/KeyboardArrowDown"
import { makeStyles } from "@material-ui/core/styles"

import { API, EVENT_TYPES } from "../../config/types"
import withStreamSubscription from "./withStreamSubscription"
import { roundToLastFullDay, getTimestampsBetween, MILLISECONDS_PER_DAY } from "./utils"
import Trend from "../../components/Styled/Trend"

function getUpDownTrendFromEvents(events: API.Event<API.MemberEventMeta>[]) {
    let amountUp = 0, amountDown = 0

    for (let event of events) {
        if (event.type === EVENT_TYPES.GUILD_MEMBER_ADD) {
            amountUp++
        } else if (event.type === EVENT_TYPES.GUILD_MEMBER_REMOVE) {
            amountDown++
        }
    }

    return [amountUp, amountDown]
}

function getTrendFromEvents(events: API.Event<API.MemberEventMeta>[]) {
    const [up, down] = getUpDownTrendFromEvents(events)
    return up + down
}

const useStyles = makeStyles(theme => ({
    success: {
        color: theme.palette.success.main
    },

    error: {
        color: theme.palette.error.main
    }
}))

function MemberTrendAtDay({ data, timestamp = Date.now() }: {
    data: API.Event<API.MemberEventMeta>[],
    timestamp?: number
}) {
    const classes = useStyles()
    
    const [amountUp, amountDown] = useMemo(() => {
        const to = timestamp
        const from = roundToLastFullDay(to)
        const eventsAtDay = getTimestampsBetween(data, from, to)
        return getUpDownTrendFromEvents(eventsAtDay)
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

function _MemberTrendAtDayTrend({ data, timestamp = Date.now() }: {
    data: API.Event<API.MemberEventMeta>[],
    timestamp: number
}) {

    const trend = useMemo(() => {
        if (data.length === 0) {
            return 0
        }

        const to = roundToLastFullDay(timestamp)
        const from = to - MILLISECONDS_PER_DAY

        const eventsAtDay = getTimestampsBetween(data, to, timestamp)
        const eventsAtOneDayAgo = getTimestampsBetween(data, from, to)

        const volumeAtDay = getTrendFromEvents(eventsAtDay)
        const volumeAtOneDayAgo = getTrendFromEvents(eventsAtOneDayAgo)

        return (volumeAtDay - volumeAtOneDayAgo) / volumeAtOneDayAgo
    }, [data, timestamp])

    return <Trend value={trend}/>
}

export default withStreamSubscription(MemberTrendAtDay, "members")

export const MemberTrendAtDayTrend = withStreamSubscription(_MemberTrendAtDayTrend, "members", {
    showOverlayIfEmpty: false
})