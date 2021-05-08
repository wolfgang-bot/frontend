const BoxStackAbstract = require("./BoxStackAbstract.js")
const config = require("../config.js")

const matrix = [
    [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
    ]
]

const colors = [1, 4, 3, 0, 0, 2]
    .map((index) => config.colors[index])

class BoxStack2 extends BoxStackAbstract {
    constructor(boxSize) {
        super(matrix, colors, boxSize)
    }
}

module.exports = BoxStack2
