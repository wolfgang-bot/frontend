import React from "react"
import { Box } from "@material-ui/core"

import CommandCard from "./CommandCard"

function CommandList() {
    return (
        <>
            {Array(3).fill(0).map((_, i) => (
                <Box mt={3} key={i}>
                    <CommandCard/>
                </Box>
            ))}
        </>
    )
}

export default CommandList