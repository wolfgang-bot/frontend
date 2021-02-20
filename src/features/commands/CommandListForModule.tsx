import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CircularProgress, Grid, Typography, Card, Box, Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RootState } from "../../store"
import { fetchCommands } from "./commandsSlice"
import CommandCard from "./CommandCard"

const useStyles = makeStyles(theme => ({
    group: {
        padding: theme.spacing(2)
    }
}))

function CommandListForModule({ moduleKey }: {
    moduleKey: string
}) {
    const classes = useStyles()

    const dispatch = useDispatch()

    const status = useSelector((store: RootState) => store.commands.status)
    const data = useSelector((store: RootState) => store.commands.data?.[moduleKey])
    const error = useSelector((store: RootState) => store.commands.error)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCommands())
        }
    }, [dispatch, status])

    if (status === "success") {
        if (!data) {
            return null
        }

        return (
            <Grid container spacing={5}>
                {Object.entries(data).map(([groupName, commands]) => (
                    <Grid item xs key={groupName}>
                        <Card className={classes.group}>
                            <Typography variant="h6">
                                {groupName}
                            </Typography>

                            {Object.values(commands).map((command, index) => (
                                <React.Fragment key={command.name}>
                                    <Box my={2}>
                                        <CommandCard command={command}/>
                                    </Box>
                                    {index < Object.values(commands).length - 1 && (
                                        <Divider />
                                    )}
                                </React.Fragment>
                            ))}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
    }

    if (status === "error") {
        return (
            <div>{error}</div>
        )
    }
    
    return (
        <CircularProgress/>
    )
}

export default CommandListForModule