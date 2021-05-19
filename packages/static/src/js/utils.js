function getNodeDimensions(node) {
    const rect = node.getBoundingClientRect()
    return [rect.width, rect.height]
}

function getContentWidth() {
    const maxWidth = 1280
    const padding = 24
    return Math.min(window.innerWidth, maxWidth) - padding * 2
}

function ensureIsArray(value) {
    return !Array.isArray(value) ? [value] : value
}

module.exports = {
    getNodeDimensions,
    getContentWidth,
    ensureIsArray
}
