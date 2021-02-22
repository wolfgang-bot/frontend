import React from "react"
import { Box } from "@material-ui/core"

import GuildCard from "./GuildCard"

function GuildList() {
    return (
        <>
            {Array(3).fill(3).map((_, i) => (
                <Box mt={2} key={i}>
                    <GuildCard/>
                </Box>
            ))}
        </>
    )
}

export default GuildList