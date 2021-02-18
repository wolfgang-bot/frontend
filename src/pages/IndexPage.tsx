import React from "react"
import { Typography } from "@material-ui/core"

import Layout from "../components/Layout/Layout"
import ModuleList from "../features/modules/ModuleList"

function IndexPage() {
    return (
        <Layout>
            <Typography variant="h6">Modules</Typography>
            <ModuleList/>
        </Layout>
    )
}

export default IndexPage