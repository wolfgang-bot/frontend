const MidScreenObserver = require("./MidScreenObserver")
const config = require("../config.js")

class ActivationHandler extends EventTarget {
    constructor(link, className) {
        super()
        this.link = link
        this.className = className
        this.isActive = false

        this.observer = new MidScreenObserver(
            this.link.getTarget(),
            config.linkActivationMargin
        )

        this.observer.addEventListener(
            "intersection",
            this.handleIntersection.bind(this)
        )

        this.observer.addEventListener(
            "nonintersection",
            this.handleNonIntersection.bind(this)
        )
    }

    activate() {
        this.link.getNode().classList.add(this.className)
        this.isActive = true
    }
    
    deactivate() {
        this.link.getNode().classList.remove(this.className)
        this.isActive = false
    }
    
    handleIntersection() {
        if (!this.isActive) {
            this.activate()
            this.emitUpdate()
        }
    }
    
    handleNonIntersection() {
        if (this.isActive) {
            this.deactivate()
            this.emitUpdate()
        }
    }

    emitUpdate() {
        this.dispatchEvent(new CustomEvent("update"))
    }
}

module.exports = ActivationHandler
