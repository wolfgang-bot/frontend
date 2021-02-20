import React from "react"
import { Typography } from "@material-ui/core"

import { API } from "../../config/types"

function CommandCard({ command }: { command: API.Command }) {
    return (
        <div>
            <Typography variant="subtitle1" gutterBottom>{command.name}</Typography>
            <Typography variant="body2">{command.description}</Typography>
            <Typography variant="body2">Usage: {command.usage}</Typography>
        </div>
    )
}

export default CommandCard