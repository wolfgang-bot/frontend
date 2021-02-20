import React from "react"
import { Paper, Box, Typography } from "@material-ui/core"

function StatisticCard({ main, secondary, className }: {
    main: React.ReactNode,
    secondary: React.ReactNode,
    className?: string
}) {
    return (
        <Paper variant="outlined" className={className}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                padding={4}
                width={256}
            >
                <Typography variant="h4">
                    {main}
                </Typography>

                <Typography variant="body1">
                    {secondary}
                </Typography>
            </Box>
        </Paper>
    )
}

export default StatisticCard