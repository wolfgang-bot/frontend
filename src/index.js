import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"

import store from "./store.js"
import App from "./App.js"
import "./index.css"
import { DEBUG } from "./config/constants.js"

const theme = createMuiTheme({
    palette: {
        theme: "dark",
        type: "dark",

        background: {
            default: "#282833",
            paper: "#333340"
        },

        primary: {
            main: "#BB86FC",
            variant: "#3700B3"
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
