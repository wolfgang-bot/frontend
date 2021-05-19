const config = require("../config.js")
const { getNodeDimensions, getContentWidth } = require("../utils.js")

class Dimensions extends EventTarget {
    constructor(canvas) {
        super()
        this.canvas = canvas
        this.currentBreakpoint = null
        window.addEventListener("resize", this.update.bind(this))
    }
    
    getDimensions() {
        const [_, height] = getNodeDimensions(this.canvas)
        const width = getContentWidth()
        return { width, height }
    }

    update() {
        const dimensions = this.getDimensions()

        this.dispatchEvent(new CustomEvent("update", {
            detail: dimensions
        }))

        if (dimensions.width <= config.breakpointS) {
            this.updateBreakpoint(Dimensions.BREAKPOINTS.S)
        } else {
            this.updateBreakpoint(Dimensions.BREAKPOINTS.L)
        }
    }

    updateBreakpoint(breakpoint) {
        if (breakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = breakpoint
            this.dispatchEvent(new CustomEvent("breakpoint", {
                detail: {
                    breakpoint
                }
            }))
        }
    }
}

Dimensions.BREAKPOINTS = BREAKPOINTS = {
    S: Symbol("s"),
    L: Symbol("l")
}

module.exports = Dimensions
