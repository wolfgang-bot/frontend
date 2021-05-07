import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { IconButton } from "@material-ui/core"
import LightIcon from "@material-ui/icons/Brightness7"
import DarkIcon from "@material-ui/icons/Brightness4"

import { RootState } from "../../store"
import { set } from "./settingsSlice"

function DarkModeSwitch() {
    const dispatch = useDispatch()

    const isDarkMode = useSelector((store: RootState) => store.settings.isDarkMode)

    const handleClick = () => {
        dispatch(set({
            isDarkMode: !isDarkMode
        }))
    }

    return (
        <IconButton onClick={handleClick} size="small">
            {isDarkMode ? <LightIcon/> : <DarkIcon/>}
        </IconButton>
    )
}

export default DarkModeSwitch