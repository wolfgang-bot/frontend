import React from "react"
import { useSelector } from "react-redux"
import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RootState } from "./store"
import Router from "./router"
import Logger from "./utils/Logger"
import useLogin from "./utils/useLogin"

export const lightTheme = createMuiTheme({
    palette: {
        background: {
            default: "#F5F7FB",
            paper: "#FFFFFF"
        }
    }
})

export const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: "#0B0E11",
            paper: "#151A21"
        }
    }
})

const useStyles = makeStyles(theme => ({
    "@global": {
        a: {
            textDecoration: "none"
        },
        "*::-webkit-scrollbar": {
            width: "4px"
        },
        "*::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, .5)"
        }
    }
}))

function GlobalStyles() {
    useStyles()
    return <CssBaseline/>
}

function App() {
    useLogin()

    const isDarkMode = useSelector((store: RootState) => store.settings.isDarkMode)

    const theme = isDarkMode ? darkTheme : lightTheme

    Logger.debug(theme)

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <Router/>
        </ThemeProvider>
    )
}

export default App
