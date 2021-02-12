import React from "react"
import { Card, CardHeader, CardActionArea, CardActions, Typography, Box } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

function IconButton() {
    return (
        <Box m={0.5}>
            <Skeleton variant="circle" width={24} height={24} />
        </Box>
    )
}

function ModuleName({ seed }: { seed: number }) {
    return (
        <Skeleton
            width={130 + seed * 50}
        />
    )
}

function ModuleCard({ seed }: { seed: number }) {
    return (
        <Card>
            <CardActionArea>
                <CardHeader
                    disableTypography
                    avatar={<Skeleton variant="circle" width={40} height={40}/>}
                    title={<Typography variant="body1"><ModuleName seed={seed}/></Typography>}
                />
            </CardActionArea>

            <CardActions>
                <IconButton/>
                <IconButton/>
                <IconButton/>
            </CardActions>
        </Card>
    )
}

export default ModuleCard