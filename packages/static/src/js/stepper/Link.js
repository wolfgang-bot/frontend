class Link {
    constructor(node) {
        this.node = node
    }

    getNode() {
        return this.node
    }

    getTargetId() {
        return this.node.getAttribute("href").slice(1)
    }

    getTarget() {
        return document.getElementById(this.getTargetId())
    }
}

module.exports = Link
