import React from "react"
import clsx from "clsx"
import { Typography, Paper, Card, CardActionArea, CardHeader } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { API } from "../../config/types"
import { copyToClipboard } from "../../utils"
import opener from "../../components/ComponentOpener"

const useStyles = makeStyles(theme => ({
    command: {
        padding: theme.spacing(3)
    },

    gutterBottom: {
        marginBottom: theme.spacing(1)
    }
}))

function Codeblock(props: React.PropsWithChildren<any>) {
    const handleClick = async () => {
        const success = await copyToClipboard(props.children)

        if (success) {
            opener.openSnackbar("Copied to clipboard!")
        }
    }

    return (
        <Card variant="outlined">
            <CardActionArea onClick={handleClick}>
                <CardHeader
                    disableTypography
                    title={
                        <Typography variant="body1">
                            {props.children}
                        </Typography>
                    }
                />
            </CardActionArea>
        </Card>
    )
}

function CommandCard({ command, className }: {
    command: API.Command,
    className: string
}) {
    const classes = useStyles()
    
    return (
        <Paper
            className={clsx(classes.command, className)}
            variant="outlined"
        >
            <Typography variant="h6" className={classes.gutterBottom}>
                {command.callableName}
            </Typography>
            
            <Typography variant="body1" className={classes.gutterBottom}>
                {command.description}
            </Typography>

            <Codeblock>
                {command.usage}
            </Codeblock>
        </Paper>
    )
}

export default CommandCard