const Link = require("./Link.js")
const BetterScroll = require("./BetterScroll.js")
const ActivationGroup = require("./ActivationGroup.js")

const ACTIVE_CLASS = "active"

const container = document.getElementById("stepper")
const anchorNodes = Array.from(container.querySelectorAll("a"))

const links = anchorNodes.map((node) => new Link(node))

links.forEach((link) => {
    new BetterScroll(link.getNode(), link.getTarget())
})

new ActivationGroup(links, ACTIVE_CLASS)
