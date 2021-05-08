const THREE = require("three")

class Box {
    constructor(size, color) {
        this.size = size
        this.color = color
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

    setUpdateFunction(fn) {
        this.updateFunction = fn
    }

    update(time) {
        this.updateFunction?.call(this, time)
    }
}

module.exports = Box
