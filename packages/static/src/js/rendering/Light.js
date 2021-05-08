const THREE = require("three")

class Light {
    constructor() {
        this.createObject()
    }

    createObject() {
        this.light = new THREE.PointLight(0xFFFFFF, 1.3)
        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, .3)
    }

    getObject() {
        return [
            this.light,
            this.light.target,
            this.ambientLight
        ]
    }

    setPosition(x, y, z) {
        this.light.position.set(x, y, z)
    }
}

module.exports = Light
