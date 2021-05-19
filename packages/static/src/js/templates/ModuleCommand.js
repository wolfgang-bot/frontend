const template = document.getElementById("module-command-template")

class ModuleCommand {
    constructor(command) {
        this.node = template.cloneNode(true).content
        this.command = command
        this.render()
    }

    getNode() {
        return this.node
    }

    render() {
        this.node.querySelector(".module-command-desc").textContent = this.command.description
        this.node.querySelector(".module-command-usage").textContent = this.command.usage
    }
}

module.exports = ModuleCommand
