import React from "react"
import { useSelector } from "react-redux"
import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Router from "./router"
import { RootState } from "./store"

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
        type: "dark"
    }
})

const useStyles = makeStyles({
    "@global": {
        a: {
            textDecoration: "none"
        }
    }
})

function App() {
    useStyles()

    const isDarkMode = useSelector((store: RootState) => store.settings.isDarkMode)

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline/>
            <Router/>
        </ThemeProvider>
    )
}

export default App