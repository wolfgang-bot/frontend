class BetterScroll {
    constructor(node, target) {
        this.node = node
        this.target = target
        this.override()
    }

    override() {
        this.node.addEventListener("click", (event) => {
            event.preventDefault()
            window.scrollTo({
                top: this.getScrollY(this.target),
                behavior: "smooth"
            })
        })
    }

    getScrollY(node) {
        return node.offsetTop - window.innerHeight * .2
    }
}

module.exports = BetterScroll
