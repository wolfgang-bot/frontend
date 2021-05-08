const api = require("./api.js")
const ModuleContent = require("./templates/ModuleContent.js")
const ModuleListConnector = require("./templates/ModuleListConnector.js")
const ModuleListItem = require("./templates/ModuleListItem.js")

const MODULE_LIST_ITEM_CLASS = "module-list-item"

const list = document.getElementById("module-list")
const contentContainer = document.getElementById("module-content")

let currentActiceModule
let currentConnector

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
        removeConnector(findModuleListItem(currentActiceModule))
    }
    
    contentContainer.innerHTML = ""
    const content = new ModuleContent(module)
    contentContainer.appendChild(content.getNode())

    addConnector(findModuleListItem(module))

    currentActiceModule = module
}

function addConnector(element) {
    currentConnector = new ModuleListConnector()
    element.appendChild(currentConnector.getNode())
    currentConnector.animateIn()
}

function removeConnector(element) {
    currentConnector.animateOut().then(() => {
        const connector = element.querySelector(".connector-container")
        element.removeChild(connector)
    })
}

function findModuleListItem(module) {
    return document.querySelector(`.${MODULE_LIST_ITEM_CLASS}[data-key='${module.key}']`)
}

api.fetchModules().then((res) => {
    if (res.length === 0) {
        return
    }
    res.filter(moduleFilter).forEach(renderModule)
    setActiveModule(res[2])
})
