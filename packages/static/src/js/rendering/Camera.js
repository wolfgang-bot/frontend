const THREE = require("three")
// const { OrbitControls } = require("three/examples/jsm/controls/OrbitControls")
const { getNodeDimensions } = require("../utils.js")

class Camera {
    constructor(canvas) {
        this.canvas = canvas
        this.createObject()
    }

    createObject() {
        const [width, height] = getNodeDimensions(this.canvas)
        this.camera = new THREE.OrthographicCamera(0, width, height, 0, 1e-2, 1e4)
        // this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 1e-2, 1e4)
        // this.controls = new OrbitControls(this.camera, this.canvas)
        // this.canvas.style.setProperty("pointer-events", "all")
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
            this.controls.target = new THREE.Vector3(x, y, z)
        }
    }
}

module.exports = Camera
