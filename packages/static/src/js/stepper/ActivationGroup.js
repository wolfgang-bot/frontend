const ActivationHandler = require("./ActivationHandler")

class ActivationGroup {
    constructor(links, className) {
        this.links = links

        this.activationHandlers = this.links.map(
            (link) => new ActivationHandler(link, className)
        )

        this.activationHandlers.forEach((handler) =>
            handler.addEventListener("update", () => this.update(handler))
        )
    }

    update(handler) {
        this.activationHandlers.forEach((_handler) => {
            if (_handler !== handler) {
                _handler.deactivate()
            }
        })
    }
}

module.exports = ActivationGroup
