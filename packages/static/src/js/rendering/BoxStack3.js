const BoxStackAbstract = require("./BoxStackAbstract.js")
const config = require("../config.js")

const matrix = [
    [
        [0, 0],
        [0, 1]
    ],
    [
        [0, 1],
        [1, 1]
    ]
]

const colors = [1, 2, 3, 0]
    .map((index) => config.colors[index])

class BoxStack3 extends BoxStackAbstract {
    constructor(boxSize) {
        super(matrix, colors, boxSize)
    }
}

module.exports = BoxStack3
