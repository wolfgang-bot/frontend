import React from "react"
import { Box } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

function ConfigForm() {
    return (
        <>
            {new Array(3).fill(null).map((_, index) => (
                <React.Fragment key={index}>
                    <Skeleton height={22} width="40%"/>
                    <Skeleton height={14} width="80%"/>
                    <Box mt={1} mb={2}>
                        <Skeleton variant="rect" height={56} />
                    </Box>
                </React.Fragment>
            ))}
        </>
    )
}

export default ConfigForm