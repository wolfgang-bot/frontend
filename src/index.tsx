import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"

import store from "./store"
import App from "./App"
import "./index.css"
import Logger  from "./utils/Logger"

export const theme = createMuiTheme({
    palette: {
        background: {
            default: "#F5F7FB",
            paper: "#FFFFFF"
        }
    }

    // palette: {
    //     type: "dark",

    //     background: {
    //         default: "#282833",
    //         paper: "#333340"
    //     },

    //     primary: {
    //         main: "#BB86FC"
    //     },

    //     secondary: {
    //         main: "#03DAC5",
    //         dark: "#336D6F"
    //     },

    //     error: {
    //         main: "#CF6679"
    //     }
    // }
})

Logger.debug(theme)

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
)
