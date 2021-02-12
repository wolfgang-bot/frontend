import React from "react"
import { Box } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    channelInput: {
        minWidth: 300
    }
})

function ChannelInput() {
    const classes = useStyles()

    return (
        <Box className={classes.channelInput} mb={1}>
            <Skeleton height={12} width="20%"/>
            <Box my={0.5}>
                <Skeleton variant="rect" height={32}/>
            </Box>
            <Skeleton height={19} width="70%"/>
        </Box>
    )
}

export default ChannelInput