import React from "react"
import { Paper, Box, Typography, Divider } from "@material-ui/core"

function ChartCard({ chart, label, className, width = 370 }: {
    chart: React.ReactNode,
    label: React.ReactNode,
    width?: number | string | null,
    className?: string
}) {
    return (
        <Box width={width}>
            <Paper variant="outlined" className={className}>
                    <Box mx={3} my={2}>
                        <Typography variant="body1">{label}</Typography>
                    </Box>

                    <Divider/>

                    <Box mt={2}>
                        {chart}
                    </Box>
            </Paper>
        </Box>
    )
}

export default ChartCard