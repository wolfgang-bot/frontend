const template = document.getElementById("module-feature-template")

class ModuleFeature {
    constructor(text) {
        this.node = template.cloneNode(true).content
        this.text = text
        this.render()
    }

    getNode() {
        return this.node
    }

    render() {
        this.node.querySelector(".module-feature-content").textContent = this.text
    }
}

module.exports = ModuleFeature
