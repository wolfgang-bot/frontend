import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout"
import ModuleList from "../features/modules/ModuleList"
import CommandListForModule from "../features/commands/CommandListForModule"

const useStyles = makeStyles(theme => ({
    title: {
        margin: `${theme.spacing(4)}px 0`
    }
}))

function IndexPage() {
    const classes = useStyles()

    return (
        <Layout>
            <Typography variant="h5" className={classes.title}>
                Modules
            </Typography>
            <ModuleList/>
            {/* <Typography variant="h6">Commands</Typography>
            <CommandListForModule moduleKey="main"/> */}
        </Layout>
    )
}

export default IndexPage