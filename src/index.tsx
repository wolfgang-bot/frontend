import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"

import store from "./store"
import App from "./App"
import "./index.css"
import { DEBUG } from "./config/constants"

export const theme = createMuiTheme({
    palette: {
        type: "dark",

        background: {
            default: "#282833",
            paper: "#333340"
        },

        primary: {
            main: "#BB86FC"
        },

        secondary: {
            main: "#03DAC5",
            dark: "#336D6F"
        },

        error: {
            main: "#CF6679"
        }
    }
})

if (DEBUG) {
    console.log(theme)
}

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
)
