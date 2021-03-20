import React, { useState } from "react"
import { Paper, Box, Typography, Divider, IconButton } from "@material-ui/core"
import MagnetOnIcon from "@material-ui/icons/GridOn"
import MagnetOffIcon from "@material-ui/icons/GridOff"

function ChartCard({ chart, label, className, width = "100%" }: {
    chart: React.ReactElement,
    label: React.ReactNode,
    width?: number | string | null,
    className?: string
}) {
    const [hasMagnetCursor, setHasMagnetCursor] = useState<boolean>(true)

    const toggleHasMagnetCursor = () => {
        setHasMagnetCursor(!hasMagnetCursor)
    }

    return (
        <Box width={width}>
            <Paper variant="outlined" className={className}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box mx={3} my={2}>
                            <Typography variant="body1">{label}</Typography>
                        </Box>

                        <Box mx={2}>
                            <IconButton
                                size="small"
                            onClick={toggleHasMagnetCursor}
                            >
                                {
                                hasMagnetCursor ?
                                    <MagnetOffIcon fontSize="small"/> :
                                    <MagnetOnIcon fontSize="small"/>
                                }
                            </IconButton>
                        </Box>
                    </Box>

                    <Divider/>

                    <Box mt={2}>
                        {React.cloneElement(React.Children.only(chart), {
                            hasMagnetCursor
                        })}
                    </Box>
            </Paper>
        </Box>
    )
}

export default ChartCard
