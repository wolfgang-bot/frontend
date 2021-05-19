const Scene = require("./Scene.js")
const { getNodeDimensions } = require("../utils.js")
const Dimensions = require("./Dimensions.js")

class Canvas {
    constructor({
        id,
        getCameraPosition,
        getCameraFocusPosition,
        getLightPosition
    }) {
        this.getCameraPosition = getCameraPosition
        this.getCameraFocusPosition = getCameraFocusPosition
        this.getLightPosition = getLightPosition
        
        this.canvas = document.getElementById(id)
        const [width, height] = getNodeDimensions(this.canvas)
        this.width = width
        this.height = height

        this.resetScene()

        this.dimensions = new Dimensions(this.canvas)
        this.dimensions.addEventListener("breakpoint", this.handleBreakpoint.bind(this))

        this.breakpoints = new Map()
    }

    resetScene() {
        if (this.scene) {
            this.scene.dispose()
        }
        this.scene = new Scene(this.canvas)
        this.scene.setCameraPosition(...this.getCameraPosition.call(this))
        this.scene.setCameraFocusPosition(...this.getCameraFocusPosition.call(this))
        this.scene.setLightPosition(...this.getLightPosition.call(this))
    }

    defineBreakpoint(breakpoint, fn) {
        this.breakpoints.set(breakpoint, fn)
    }

    handleBreakpoint({ detail: { breakpoint } }) {
        this.resetScene()
        this.breakpoints.get(breakpoint)?.call(this)
        this.scene.start()
    }

    render() {
        this.dimensions.update()
    }
}

module.exports = Canvas
