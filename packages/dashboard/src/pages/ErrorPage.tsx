import React, { useState } from "react"
import {
    Box,
    Button,
    Card,
    CardActionArea,
    Collapse,
    Container,
    Grid,
    Typography
} from "@material-ui/core"

import whatGif from "../assets/images/what.gif"
import ExpandIcon from "../components/Styled/ExpandIcon"

function Details({ error }: { error: Error }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Card variant="outlined">
            <CardActionArea
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <Box
                    py={1}
                    px={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h6">
                        Details
                    </Typography>

                    <ExpandIcon expanded={isExpanded}/>
                </Box>
            </CardActionArea>

            <Collapse in={isExpanded}>
                <Box py={1} px={2}>
                    <Grid
                        container
                        direction="column"
                        spacing={1}
                    >
                        <Grid item>
                            <Typography variant="h6">
                                Message
                            </Typography>
                        </Grid>

                        <Grid item>
                            {error.message}
                        </Grid>

                        <Grid item>
                            <Typography variant="h6">
                                Stacktrace
                            </Typography>
                        </Grid>

                        <Grid item>
                            {error.stack}
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>
        </Card>
    )
}

function ErrorPage({ error }: { error: Error }) {
    return (
        <Container maxWidth="sm">
            <Box mt={16}>
                <Grid
                    container
                    spacing={4}
                    direction="column"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="h6">
                            Something went wrong
                        </Typography>
                    </Grid>

                    <Grid item>
                        <img src={whatGif} alt="What"/>
                    </Grid>

                    <Grid item>
                        <a href="/">
                            <Button variant="contained" color="primary">
                                Homepage
                            </Button>
                        </a>
                    </Grid>

                    <Grid item>
                        <Details error={error}/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default ErrorPage
