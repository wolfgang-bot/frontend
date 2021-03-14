import React from "react"
import { Paper, Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    trend: {
        position: "absolute",
        top: theme.spacing(1.5),
        right: theme.spacing(1.5)
    }
}))

function StatisticCard({ main, trend, label, className }: {
    main: React.ReactNode,
    trend?: React.ReactNode,
    label: React.ReactNode,
    className?: string
}) {
    const classes = useStyles()

    return (
        <Paper variant="outlined" className={className}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                position="relative"
                padding={4}
                width={256}
            >
                <Typography
                    variant="subtitle1"
                    className={classes.trend}
                >
                    {trend}
                </Typography>

                <Typography variant="h4">
                    {main}
                </Typography>

                <Typography variant="body1">
                    {label}
                </Typography>
            </Box>
        </Paper>
    )
}

export default StatisticCard
