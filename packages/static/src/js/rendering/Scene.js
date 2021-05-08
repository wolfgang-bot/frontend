const THREE = require("three")
const Renderer = require("./Renderer")
const Light = require("./Light")
const Camera = require("./Camera.js")
const { ensureIsArray } = require("../utils.js")

class Scene {
    constructor(canvas) {
        this.canvas = canvas
        this.init()
    }
    
    init() {
        this.scene = new THREE.Scene()
        
        this.camera = new Camera(this.canvas)
        this.addObject(this.camera)

        this.light = new Light()
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

    setCameraPosition(x, y, z) {
        this.camera.setPosition(x, y, z)
    }

    setCameraFocusPosition(x, y, z) {
        this.camera.lookAt(x, y, z)
    }

    setLightPosition(x, y, z) {
        this.light.setPosition(x, y, z)
    }
}

module.exports = Scene
