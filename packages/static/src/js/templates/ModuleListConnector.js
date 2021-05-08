const anime = require("animejs")

const CONNECTOR_CLASS = "connector"
const MASK_CLASS = "connector-mask"
const CONTAINER_CLASS = "connector-container"
const MASK_OFFSET_VAR_NAME = "offset"

const ANIMATION_DURATION = 100

class ModuleListConnector {
    constructor() {
        this.connector = document.createElement("div")
        this.mask = document.createElement("div")
        this.container = document.createElement("div")
        this.container.appendChild(this.connector)
        this.container.appendChild(this.mask)
        this.render()
    }

    getNode() {
        return this.container
    }

    render() {
        this.connector.classList.add(CONNECTOR_CLASS)
        this.mask.classList.add(MASK_CLASS)
        this.container.classList.add(CONTAINER_CLASS)
    }

    animateIn() {
        return this.animate(1)
    }

    animateOut() {
        return this.animate(-1)
    }
    
    animate(direction) {
        return new Promise((resolve) => {
            const target = {
                offset: 0
            }
    
            const steps = [0, 48]
    
            anime({
                targets: target,
                offset: direction === -1 ? steps.reverse() : steps,
                duration: ANIMATION_DURATION,
                easing: "easeOutSine",
                update: () => {
                    this.setMaskOffset(target.offset)
                },
                complete: () => {
                    resolve()
                }
            })
        })
    }

    setMaskOffset(offset) {
        this.mask.style.setProperty("--" + MASK_OFFSET_VAR_NAME, offset + "px")
    }
}

module.exports = ModuleListConnector
