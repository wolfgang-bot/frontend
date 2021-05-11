class MidScreenObserver extends EventTarget {
    constructor(target, margin) {
        super()
        this.target = target
        this.margin = margin

        this.handleUpdate = this.handleUpdate.bind(this)
        
        window.addEventListener("scroll", this.handleUpdate)
        window.addEventListener("resize", this.handleUpdate)
    }

    handleUpdate() {
        const rect = this.target.getBoundingClientRect()
        if (this.intersects(rect)) {
            this.dispatchEvent(new CustomEvent("intersection"))
        } else {
            this.dispatchEvent(new CustomEvent("nonintersection"))
        }
    }

    intersects(rect) {
        return (
            rect.y + rect.height >= this.margin &&
            rect.y <= window.innerHeight - this.margin
        )
    }
}

module.exports = MidScreenObserver
