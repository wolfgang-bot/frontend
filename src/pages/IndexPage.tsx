import React from "react"

import Layout from "../components/Layout/Layout"
import Title from "../components/Styled/Title"
import ModuleList from "../features/modules/ModuleList"
import CommandListForModule from "../features/commands/CommandListForModule"

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