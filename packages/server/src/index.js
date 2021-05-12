const path = require("path")
require("dotenv").config({
    path: path.join(__dirname, "..", ".env")
})

if (process.env.NODE_ENV === "development") {
    require("./dev.js")
} else {
    throw new Error("Files should be served via the nginx docker image in production")
}
