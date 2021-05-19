const template = document.getElementById("module-max-instances-template")

class ModuleMaxInstances {
    constructor(module) {
        this.module = module
        this.node = template.cloneNode(true).content
        this.render()
    }

    getNode() {
        return this.node
    }

    render() {
        this.node.querySelector(".amount").textContent = this.module.maxInstances
    }
}

module.exports = ModuleMaxInstances
