import React from "react"
import { Box, IconButton } from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"

import { API } from "../../config/types"
import opener from "../../components/ComponentOpener"

import Title from "../../components/Styled/Title"
import GuildIcon from "../../components/Discord/GuildIcon"

function Header({ guild }: { guild: API.Guild }) {
    const handleSettingsClick = () => {
        opener.openDialog("GuildSettingsDialog", { guild })
    }

    return (
        <Title>
            <Box display="flex" justifyContent="space-between">
                <Box display="flex">
                    <Box mr={2}>
                        <GuildIcon guild={guild} />
                    </Box>
                    {guild.name}
                </Box>


                <IconButton onClick={handleSettingsClick} size="small">
                    <SettingsIcon />
                </IconButton>
            </Box>
        </Title>
    )
}


export default Header
