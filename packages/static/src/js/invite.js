const config = require("./config.js")

document
    .querySelectorAll("[data-invite]")
    .forEach((link) => {
        link.href = config.inviteURL
        link.target = "_blank"
    })
