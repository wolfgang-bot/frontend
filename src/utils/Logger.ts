class Logger {
    static info = console.log
    static error = console.error

    static debug(...args: any[]) {
        if (process.env.NODE_ENV === "development") {
            console.log(...args)
        }
    }
}

export default Logger