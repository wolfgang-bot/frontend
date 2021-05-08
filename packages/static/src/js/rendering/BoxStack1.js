const BoxStackAbstract = require("./BoxStackAbstract.js")
const config = require("../config.js")

const matrix = [
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 1]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [1, 1, 1]
    ]
]

const colors = [0, 4, 3, 1, 1, 2, 3]
    .map((index) => config.colors[index])

class BoxStack1 extends BoxStackAbstract {
    constructor(boxSize) {
        super(matrix, colors, boxSize)
    }

    update(time) {
        this.forEachCell((i, x, y, z) => {
            const offset = (x + z) / 2
            this.boxes[i].move(0, Math.sin(time / 3000 + offset) / 12, 0)
        })
    }
}

module.exports = BoxStack1
