const api = require("./api.js")
const ModuleContent = require("./templates/ModuleContent.js")
const ModuleListItem = require("./templates/ModuleListItem.js")

const list = document.getElementById("module-list")
const contentContainer = document.getElementById("module-content")

function moduleFilter(module) {
    return !module.isStatic
}

function renderModule(module) {
    const item = new ModuleListItem(module)
    item.getNode()
        .querySelector(".module-list-item")
        .addEventListener("mouseover", setActiveModule.bind(null, module))
    list.appendChild(item.getNode())
}

function setActiveModule(module) {
    contentContainer.innerHTML = ""
    const content = new ModuleContent(module)
    contentContainer.appendChild(content.getNode())
}

api.fetchModules().then((res) => {
    if (res.length === 0) {
        return
    }
    res.filter(moduleFilter).forEach(renderModule)
    setActiveModule(res[2])
})
