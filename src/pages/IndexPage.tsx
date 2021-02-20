import React from "react"
import { Typography } from "@material-ui/core"

import Layout from "../components/Layout/Layout"
import ModuleList from "../features/modules/ModuleList"
import CommandListForModule from "../features/commands/CommandListForModule"

function IndexPage() {
    return (
        <Layout>
            <Typography variant="h6">Modules</Typography>
            <ModuleList/>
            <Typography variant="h6">Commands</Typography>
            <CommandListForModule moduleKey="main"/>
        </Layout>
    )
}

export default IndexPage