import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import Layout from "../components/Layout/Layout"
// import GuildList from "../features/guilds/GuildList"

function ProfilePage() {
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Redirect to="/login"/>
    }

    return (
        <Layout center>
            {/* <GuildList/> */}
        </Layout>
    )
}

export default ProfilePage