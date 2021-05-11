const { WebGLRenderer } = require("three/src/renderers/WebGLRenderer")
const { getNodeDimensions } = require("../utils.js")

class Renderer {
    constructor(canvas) {
        this.canvas = canvas
        this.init()
    }

    init() {
        this.renderer = new WebGLRenderer({
            antialias: true,
            canvas: this.canvas,
            alpha: true
        })
        this.renderer.setSize(...getNodeDimensions(this.canvas))
        this.renderer.setClearColor(0xFFFFFF, 0)
    }

    render(scene, camera) {
        this.renderer.render(scene, camera)
    }

    startAnimationLoop(fn) {
        this.renderer.setAnimationLoop(fn)
    }
}

module.exports = Renderer
