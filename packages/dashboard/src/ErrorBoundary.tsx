import React from "react"

import ErrorPage from "./pages/ErrorPage"
import Logger from "./utils/Logger"

type Props = React.PropsWithChildren<{}>

type State = {
    error: Error | null
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            error: null
        }
    }

    static getDerivedStateFromError(error: Error) {
        return { error }
    }

    componentDidCatch(error: Error, errorInfo: any) {
        Logger.error({ error, errorInfo })
    }

    render() {
        if (this.state.error) {
            return <ErrorPage error={this.state.error}/>
        }

        return this.props.children
    }
}

export default ErrorBoundary
