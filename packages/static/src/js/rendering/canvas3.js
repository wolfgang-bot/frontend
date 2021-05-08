const Scene = require("./Scene.js")
const Box = require("./Box.js")
const BoxStack = require("./BoxStack3.js")
const config = require("../config.js")
const { getNodeDimensions } = require("../utils.js")

const canvas = document.getElementById("canvas-3")
const [width] = getNodeDimensions(canvas)

const scene = new Scene(canvas)
scene.setCameraPosition(-300, 600, 500)
scene.setCameraFocusPosition(100, 0, -200)
scene.setLightPosition(width / 2, 1000, 0)

const box = new Box(70, config.colors[0])
box.setPosition(250, 325, 0)
box.setRotation(0, Math.PI / 8, 0)
scene.addObject(box)

const stack = new BoxStack(90)
stack.setPosition(1050, 100, 0)
scene.addObject(stack)

scene.start()
