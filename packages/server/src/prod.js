const path = require("path")
const fastify = require("fastify")()
const static = require("fastify-static")
const compress = require("fastify-compress")

const PACKAGES_DIR = path.join(__dirname, "..", "..")
const DASHBOARD_BUILD_DIR = path.join(PACKAGES_DIR, "dashboard", "build")
const STATIC_BUILD_DIR = path.join(PACKAGES_DIR, "static", "build")

fastify.register(compress)

fastify.register(static, {
    root: STATIC_BUILD_DIR
})

fastify.register(static, {
    root: DASHBOARD_BUILD_DIR,
    prefix: "/dashboard",
    decorateReply: false,
    prefixAvoidTrailingSlash: true
})

fastify.listen(process.env.PORT, process.env.HOST).then(() => {
    console.log(`Serving frontend on port ${process.env.PORT}`)
})
