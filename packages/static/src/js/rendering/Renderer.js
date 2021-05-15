const { WebGLRenderer } = require("three/src/renderers/WebGLRenderer")
const Dimensions = require("./Dimensions.js")

class Renderer {
    constructor(canvas) {
        this.canvas = canvas
        this.dimensions = new Dimensions(this.canvas)
        this.dimensions.addEventListener("update", this.setDimensions.bind(this))
        this.init()
    }

    init() {
        this.renderer = new WebGLRenderer({
            antialias: true,
            canvas: this.canvas,
            alpha: true
        })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearColor(0xFFFFFF, 0)
        this.dimensions.update()
    }
    
    setDimensions({ detail: { width, height } }) {
        this.renderer.setSize(width, height)
    }

    render(scene, camera) {
        this.renderer.render(scene, camera)
    }

    startAnimationLoop(fn) {
        this.renderer.setAnimationLoop(fn)
    }

    dispose() {
        this.renderer.dispose()
    }
}

module.exports = Renderer
