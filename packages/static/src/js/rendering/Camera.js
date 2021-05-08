const THREE = require("three")

class Camera {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.createObject()
    }

    createObject() {
        this.camera = new THREE.OrthographicCamera(
            0,
            this.width,
            0,
            this.height,
            1e-2,
            1e4
        )
    }

    getObject() {
        return this.camera
    }

    setPosition(x, y, z) {
        this.camera.position.set(x, y, z)
    }
}

module.exports = Camera
