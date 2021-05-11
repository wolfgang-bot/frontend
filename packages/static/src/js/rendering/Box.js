const THREE = require("three")
const config = require("../config.js")

class Box {
    constructor(size, color, animated = false) {
        this.size = size
        this.color = color
        this.animated = animated
        this.createObject()
    }

    createObject() {
        this.geometry = new THREE.BoxGeometry(
            this.size,
            this.size,
            this.size
        )
        this.material = new THREE.MeshLambertMaterial({
            color: this.color
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }

    getObject() {
        return this.mesh
    }

    setRotation(x, y, z) {
        this.mesh.rotation.set(x, y, z)
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z)
    }

    move(x, y, z) {
        this.mesh.position.add(new THREE.Vector3(x, y, z))
    }

    update(time) {
        if (!this.animated) {
            return
        }
        this.setRotation(0, time / (8 * config.animationSpeed), 0)
        this.move(0, Math.sin(time / (4 * config.animationSpeed)) / 8, 0)
    }
}

module.exports = Box
