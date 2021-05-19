const { OrthographicCamera } = require("three/src/cameras/OrthographicCamera")
const { Vector3 } = require("three/src/math/Vector3")
// const { OrbitControls } = require("three/examples/jsm/controls/OrbitControls")
const Dimensions = require("./Dimensions.js")

class Camera {
    constructor(canvas) {
        this.canvas = canvas
        this.dimensions = new Dimensions(this.canvas)
        this.dimensions.addEventListener("update", this.setDimensions.bind(this))
        this.createObject()
    }

    createObject() {
        const { width, height } = this.dimensions.getDimensions()
        this.camera = new OrthographicCamera(0, width, height, 0, 1e-2, 1e4)
        // this.camera = new PerspectiveCamera(70, width / height, 1e-2, 1e4)
        // this.controls = new OrbitControls(this.camera, this.canvas)
        // this.canvas.style.setProperty("pointer-events", "all")
    }

    setDimensions({ detail: { width, height } }) {
        this.camera.right = width
        this.camera.top = height
        this.camera.updateProjectionMatrix()
    }
    
    getObject() {
        return this.camera
    }

    setPosition(x, y, z) {
        this.camera.position.set(x, y, z)
    }

    lookAt(x, y, z) {
        this.camera.lookAt(x, y, z)
        if (this.controls) {
            this.controls.target = new Vector3(x, y, z)
        }
    }
}

module.exports = Camera
