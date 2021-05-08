const THREE = require("three")
const Renderer = require("./Renderer")
const Light = require("./Light")
const Box = require("./Box.js")
const Camera = require("./Camera.js")
const config = require("../config")
const { getNodeDimensions, ensureIsArray } = require("../utils.js")

class Scene {
    constructor(canvas) {
        this.canvas = canvas
        this.init()
    }
    
    init() {
        const [width, height] = getNodeDimensions(this.canvas)

        this.scene = new THREE.Scene()
        
        this.camera = new Camera(width, height)
        this.camera.setPosition(0, 0, 500)
        this.addObject(this.camera)

        this.box = new Box(70, config.colors[0])
        this.box.setPosition(150, 300, 0)
        this.addObject(this.box)

        this.light = new Light()
        this.light.setPosition(width / 2, 0, 0)
        this.addObject(this.light)

        this.renderer = new Renderer(this.canvas)
    }

    start() {
        this.renderer.startAnimationLoop(this.update.bind(this))
    }

    addObject(object) {
        this.scene.add(...ensureIsArray(object.getObject()))
    }
    
    update(time) {
        this.renderer.render(this.scene, this.camera.getObject())
    }
}

module.exports = Scene
