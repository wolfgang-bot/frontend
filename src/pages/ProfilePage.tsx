import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import { RootState } from "../store"
import Layout from "../components/Layout/Layout"
// import GuildList from "../features/guilds/GuildList"

function ProfilePage() {
    const isLoggedIn = useSelector((store: RootState) => !!store.auth.data.user)

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