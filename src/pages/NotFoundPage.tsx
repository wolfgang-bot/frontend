import React from "react"

import Layout from "../components/Layout/Layout"
import notFoundAnimation from "../assets/images/not-found.webp"

function NotFoundPage() {
    return (
        <Layout center>
            <img src={notFoundAnimation} alt="Page not found"/>
        </Layout>
    )
}

export default NotFoundPage