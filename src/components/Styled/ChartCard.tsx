import React from "react"
import { Paper, Box, Typography, Divider } from "@material-ui/core"

function ChartCard({ chart, label, className }: {
    chart: React.ReactNode,
    label: React.ReactNode,
    className?: string
}) {
    return (
        <Paper variant="outlined" className={className}>
            <Box width={370}>
                <Box mx={3} my={2}>
                    <Typography variant="body1">{label}</Typography>
                </Box>

                <Divider/>

                <Box mt={2}>
                    {chart}
                </Box>
            </Box>
        </Paper>
    )
}

export default ChartCard