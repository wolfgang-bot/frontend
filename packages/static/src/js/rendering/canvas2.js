const Canvas = require("./Canvas.js")
const Box = require("./Box.js")
const BoxStack = require("./BoxStack2.js")
const config = require("../config.js")
const { BREAKPOINTS } = require("./Dimensions.js")

const canvas = new Canvas({
    id: "canvas-2",
    getCameraPosition() {
        return [-300, 300, 400]
    },
    getCameraFocusPosition() {
        return [0, 0, 0]
    },
    getLightPosition() {
        return [-100, 1500, 300]
    }
})

canvas.defineBreakpoint(BREAKPOINTS.L, function() {
    const box = new Box(70, config.colors[0], true)
    box.setPosition(1000, 0, 300)
    box.setRotation(0, 0, 0)
    this.scene.addObject(box)

    const stack = new BoxStack(70)
    stack.setPosition(200, 250, 0)
    this.scene.addObject(stack)
})

canvas.defineBreakpoint(BREAKPOINTS.S, function() {
    const stack = new BoxStack(70)
    stack.setPosition(75, 250, 0)
    this.scene.addObject(stack)

    this.scene.setLightPosition(-100, 1500, 500)
})

canvas.render()
