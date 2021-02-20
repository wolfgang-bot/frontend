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

function Title(props: React.PropsWithChildren<any>) {
    const classes = useStyles()

    return (
        <Typography variant="h5" className={classes.title}>
            {props.children}
        </Typography>
    )
}

function IndexPage() {
    return (
        <Layout>
            <Title>Modules</Title>
            <ModuleList/>
            <Title>Commands</Title>
            <CommandListForModule moduleKey="main"/>
        </Layout>
    )
}

export default IndexPage