const config = require("./config.js")
require("./module-list.js")
require("./rendering")

document
    .querySelectorAll("[data-invite]")
    .forEach((link) => {
        link.href = config.inviteURL
        link.target = "_blank"
    })
