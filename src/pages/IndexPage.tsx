import React from "react"

import Layout from "../components/Layout/Layout"
import Title from "../components/Styled/Title"
import ModuleList from "../features/modules/ModuleList"

function IndexPage() {
    return (
        <Layout>
            <Title>Modules</Title>
            <ModuleList/>
        </Layout>
    )
}

export default IndexPage
