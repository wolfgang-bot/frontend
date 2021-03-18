import { useMemo } from "react"
import { Box, Grid } from "@material-ui/core"
import ChevronUpIcon from "@material-ui/icons/KeyboardArrowUp"
import ChevronDownIcon from "@material-ui/icons/KeyboardArrowDown"
import { makeStyles } from "@material-ui/core/styles"

import { API } from "../../config/types"
import withStreamSubscription from "./withStreamSubscription"
import { isSVDataObject } from "./utils"
import Trend from "../../components/Styled/Trend"

const useStyles = makeStyles(theme => ({
    success: {
        color: theme.palette.success.main
    },

    error: {
        color: theme.palette.error.main
    }
}))

function MemberUpDown({ data }: {
    data: [API.OHLCDataset, API.SVDataset]
}) {    
    const classes = useStyles()
    
    const SVDataset = data[1] || []

    const [up, down] = useMemo(() => {
        const lastDataObject = SVDataset[SVDataset.length - 1]

        if (!isSVDataObject(lastDataObject)) {
            return [0, 0]
        }

        return [lastDataObject.up, lastDataObject.down]
    }, [SVDataset])

    return (
        <Grid container spacing={2}>
            <Grid item>
                <Box
                    display="flex"
                    alignItems="center"
                    className={classes.success}
                >
                    <ChevronUpIcon/>
                    <Box>{up}</Box>
                </Box>
            </Grid>
            
            <Grid item>
                <Box
                    display="flex"
                    alignItems="center"
                    className={classes.error}
                >
                    <Box>{down}</Box>
                    <ChevronDownIcon/>
                </Box>
            </Grid>
        </Grid>
    )
}

function _MemberUpDownTrend({ data }: {
    data: [API.OHLCDataset, API.SVDataset]
}) {
    const SVDataset = data[1] || []

    const trend = useMemo(() => {
        const currentDataObject = SVDataset[SVDataset.length - 1]
        const yesterdayDataObject = SVDataset[SVDataset.length - 2]

        if (
            !isSVDataObject(currentDataObject) ||
            !isSVDataObject(yesterdayDataObject)
        ) {
            return 0
        }

        const currentUpDown = currentDataObject.up + currentDataObject.down
        const yesterdayUpDown = yesterdayDataObject.up + yesterdayDataObject.down
        
        return (currentUpDown - yesterdayUpDown) / yesterdayUpDown
    }, [SVDataset])

    return <Trend value={trend}/>
}

export default withStreamSubscription(MemberUpDown, "members")

export const MemberTrendAtDayTrend = withStreamSubscription(
    _MemberUpDownTrend,
    "members", 
    { showOverlayIfEmpty: false }
)
