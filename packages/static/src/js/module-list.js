const api = require("./api.js")
const ModuleContent = require("./templates/ModuleContent.js")
const ModuleListItem = require("./templates/ModuleListItem.js")

const MODULE_LIST_ITEM_CLASS = "module-list-item"
const MODULE_ACTIVE_CLASS = "active"

const list = document.getElementById("module-list")
const contentContainer = document.getElementById("module-content")

let currentActiceModule

function moduleFilter(module) {
    return !module.isStatic
}

function renderModule(module) {
    const item = new ModuleListItem(module)
    const domNode = item.getNode().querySelector("." + MODULE_LIST_ITEM_CLASS)
    domNode.addEventListener("mouseover", setActiveModule.bind(null, module))
    domNode.dataset.key = module.key
    list.appendChild(item.getNode())
}

function setActiveModule(module) {
    if (module === currentActiceModule) {
        return
    }

    if (currentActiceModule) {
        deactivateModule(currentActiceModule)
    }
    
    contentContainer.innerHTML = ""
    const content = new ModuleContent(module)
    contentContainer.appendChild(content.getNode())

    activateModule(module)

    currentActiceModule = module
}

function activateModule(module) {
    findModuleListItem(module).classList.add(MODULE_ACTIVE_CLASS)
}

function deactivateModule(module) {
    findModuleListItem(module).classList.remove(MODULE_ACTIVE_CLASS)
}

function findModuleListItem(module) {
    return document.querySelector(`.${MODULE_LIST_ITEM_CLASS}[data-key='${module.key}']`)
}

api.fetchModules().then((res) => {
    if (res.length === 0) {
        return
    }
    res.filter(moduleFilter).forEach(renderModule)
    setActiveModule(res[0])
})
