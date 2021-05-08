const Scene = require("./Scene.js")
const Box = require("./Box.js")
const BoxStack = require("./BoxStack1.js")
const config = require("../config.js")
const { getNodeDimensions } = require("../utils.js")

const canvas = document.getElementById("canvas-1")
const [width] = getNodeDimensions(canvas)

const scene = new Scene(canvas)
scene.setCameraPosition(-300, 600, 500)
scene.setCameraFocusPosition(100, 0, -200)
scene.setLightPosition(width / 2, 1000, 0)

const box = new Box(70, config.colors[0])
box.setPosition(150, 400, 100)
box.setRotation(0, Math.PI / 6, 0)
box.setUpdateFunction(function(time) {
    this.setRotation(0, time / 8000, 0)
    this.move(0, Math.sin(time / 4000) / 8, 0)
})
scene.addObject(box)

const stack = new BoxStack(100)
stack.setPosition(900, 400, 0)
scene.addObject(stack)

scene.start()
