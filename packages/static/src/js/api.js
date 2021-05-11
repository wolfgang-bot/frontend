const config = require("./config.js")

class API {
    static fetch(path) {
        return fetch(config.apiBaseURL + path)
    }

    static async fetchModules() {
        const res = await this.fetch("/modules")
        return res.json()
    }
}

module.exports = API
