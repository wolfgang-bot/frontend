const Canvas = require("./Canvas.js")
const Box = require("./Box.js")
const BoxStack = require("./BoxStack3.js")
const config = require("../config.js")
const { BREAKPOINTS } = require("./Dimensions.js")

const canvas = new Canvas({
    id: "canvas-3",
    getCameraPosition() {
        return [-300, 600, 500]
    },
    getCameraFocusPosition() {
        return [100, 0, -200]
    },
    getLightPosition() {
        return [this.width / 2, 1000, 0]
    }
})

canvas.defineBreakpoint(BREAKPOINTS.L, function() {
    const box = new Box(70, config.colors[0], true)
    box.setPosition(250, 325, 0)
    box.setRotation(0, Math.PI / 8, 0)
    this.scene.addObject(box)

    const stack = new BoxStack(90)
    stack.setPosition(1050, 100, 0)
    this.scene.addObject(stack)
})

canvas.defineBreakpoint(BREAKPOINTS.S, function() {
    const stack = new BoxStack(70)
    stack.setPosition(100, 425, 0)
    this.scene.addObject(stack)

    this.scene.setLightPosition(100, 1000, 300)
})

canvas.render()
