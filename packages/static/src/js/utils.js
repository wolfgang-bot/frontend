function getNodeDimensions(node) {
    const rect = node.getBoundingClientRect()
    return [rect.width, rect.height]
}

function ensureIsArray(value) {
    return !Array.isArray(value) ? [value] : value
}

module.exports = {
    getNodeDimensions,
    ensureIsArray
}
