const Scene = require("./Scene.js")
const Box = require("./Box.js")
const BoxStack = require("./BoxStack2.js")
const config = require("../config.js")

const canvas = document.getElementById("canvas-2")

const scene = new Scene(canvas)
scene.setCameraPosition(-300, 300, 400)
scene.setCameraFocusPosition(0, 0, 0)
scene.setLightPosition(-100, 1500, 0)

const box = new Box(70, config.colors[0])
box.setPosition(1000, 0, 300)
box.setRotation(0, 0, 0)
scene.addObject(box)

const stack = new BoxStack(70)
stack.setPosition(200, 250, 0)
scene.addObject(stack)

scene.start()
