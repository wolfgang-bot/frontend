const config = require("../config.js")
const ModuleFeature = require("./ModuleFeature.js")
const ModuleCommand = require("./ModuleCommand.js")

const template = document.getElementById("module-content-template")

class ModuleContent {
    constructor(module) {
        this.module = module
        this.node = template.cloneNode(true).content
        this.render()
    }

    getNode() {
        return this.node
    }

    render() {
        this.module.features.forEach(this.renderFeature.bind(this))
        this.module.commands.forEach(this.renderCommand.bind(this))
        this.module.images.forEach(this.renderImage.bind(this))
    }

    renderFeature(text) {
        const template = new ModuleFeature(text)
        this.node.querySelector(".module-features").appendChild(template.getNode())
    }

    renderCommand(command) {
        const template = new ModuleCommand(command)
        this.node.querySelector(".module-commands").appendChild(template.getNode())
    }

    renderImage(filename) {
        const node = document.createElement("img")
        node.src = `${config.storageBaseURL}/modules/${this.module.key}/images/${filename}`
        this.node.querySelector(".module-images").appendChild(node)
    }
}

module.exports = ModuleContent
