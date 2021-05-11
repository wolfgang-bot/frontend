const THREE = require("three")

class Light {
    constructor() {
        this.createObject()
    }

    createObject() {
        this.light = new THREE.PointLight(0xFFFFFF, 1.2)
        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, .5)
    }
    
    attachHelper() {
        this.helper = new THREE.PointLightHelper(this.light, 10)
    }

    getObject() {
        const objects = [
            this.light,
            this.ambientLight,
        ]
        if (this.helper) {
            objects.push(this.helper)
        }
        return objects
    }

    setPosition(x, y, z) {
        this.light.position.set(x, y, z)
        if (this.helper) {
            this.helper.update()
        }
    }
}

module.exports = Light
