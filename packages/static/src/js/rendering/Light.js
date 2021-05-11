const { PointLight } = require("three/src/lights/PointLight")
const { AmbientLight } = require("three/src/lights/AmbientLight")
const { PointLightHelper } = require("three/src/helpers/PointLightHelper")

class Light {
    constructor() {
        this.createObject()
    }

    createObject() {
        this.light = new PointLight(0xFFFFFF, 1.2)
        this.ambientLight = new AmbientLight(0xFFFFFF, .5)
    }
    
    attachHelper() {
        this.helper = new PointLightHelper(this.light, 10)
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
