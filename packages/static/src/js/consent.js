console.assert(consentGranted, "'consentGranted' function not found")

const config = require("./config.js")

const consentDialog = document.getElementById("consent")
const acceptButton = document.querySelector("button[data-consent-accept]")
const declineButton = document.querySelector("button[data-consent-decline]")

const hasAccepted = JSON.parse(
    localStorage.getItem(config.localStorageKeys.consent)
)

if (typeof hasAccepted === "boolean") {
    if (hasAccepted) {
        consentGranted()
    }
} else {
    consentDialog.style.display = "flex"
}

acceptButton.addEventListener("click", acceptConsent)
acceptButton.addEventListener("click", consentGranted)

declineButton.addEventListener("click", declineConsent)

function acceptConsent() {
    consentDialog.style.display = "none"
    localStorage.setItem(config.localStorageKeys.consent, true)
}

function declineConsent() {
    consentDialog.style.display = "none"
    localStorage.setItem(config.localStorageKeys.consent, false)
}
