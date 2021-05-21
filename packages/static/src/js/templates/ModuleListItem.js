const config = require("../config.js")

const template = document.getElementById("module-list-item-template")

class ModuleListItem {
    constructor(module) {
        this.module = module
        this.node = template.cloneNode(true).content
        this.render()
    }

    getNode() {
        return this.node
    }

    render() {
        this.node.querySelector(".module-name").textContent = this.module.name
        this.node.querySelector("img").src = `${config.storageBaseURL}/modules/${this.module.key}/icon.svg`
    }
}

module.exports = ModuleListItem
