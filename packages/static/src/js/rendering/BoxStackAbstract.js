const Box = require("./Box.js")
const config = require("../config.js")

class BoxStackAbstract {
    constructor(matrix, colors, boxSize) {
        this.matrix = matrix
        this.colors = colors
        this.boxSize = boxSize
        this.position = [0, 0, 0]
        this.createObject()
    }

    createObject() {
        this.boxes = []
        this.forEachCell((i, x, y, z) => {
            const box = new Box(this.boxSize, this.colors[i])
            box.setPosition(...this.getBoxPosition(x, y, z))
            this.boxes.push(box)
        })
    }

    updateBoxPositions() {
        this.forEachCell((i, x, y, z) => {
            this.boxes[i].setPosition(...this.getBoxPosition(x, y, z))
        })
    }

    getBoxPosition(x, y, z) {
        return [
            this.position[0] + x * this.boxSize,
            this.position[1] + y * this.boxSize * -1,
            this.position[2] + z * this.boxSize
        ]
    }

    forEachCell(fn) {
        let i = 0
        for (let y = 0; y < this.matrix.length; y++) {
            for (let z = 0; z < this.matrix[0].length; z++) {
                for (let x = 0; x < this.matrix[0][0].length; x++) {
                    const cell = this.matrix[y][z][x]
                    if (cell === 1) {
                        fn(i++, x, y, z)
                    }
                }
            }
        }
    }

    getObject() {
        return this.boxes.map((box) => box.getObject())
    }

    setPosition(x, y, z) {
        this.position = [x, y, z]
        this.updateBoxPositions()
    }

    update(time) {
        this.forEachCell((i, x, _y, z) => {
            const offset = (x + z) / 2
            const dy = Math.sin(time / (3 * config.animationSpeed) + offset) / 12
            this.boxes[i].move(0, dy, 0)
        })
    }
}

module.exports = BoxStackAbstract
