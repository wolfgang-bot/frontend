import React from "react"
import { Paper, Typography, Box } from "@material-ui/core"

function Codeblock({ children }: React.PropsWithChildren<any>) {
    return (
        <Paper variant="outlined">
            <Box p={1}>
                <Typography component="pre">
                    {children}
                </Typography>
            </Box>
        </Paper>
    )
}

export default Codeblock
