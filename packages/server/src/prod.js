const path = require("path")
const fastify = require("fastify")()
const static = require("fastify-static")

const PACKAGES_DIR = path.join(__dirname, "..", "..")
const DASHBOARD_BUILD_DIR = path.join(PACKAGES_DIR, "dashboard", "build")
const STATIC_BUILD_DIR = path.join(PACKAGES_DIR, "static", "build")

fastify.register(static, {
    root: STATIC_BUILD_DIR,
    decorateReply: false
})

fastify.register(static, {
    root: DASHBOARD_BUILD_DIR,
    prefix: "/dashboard",
    wildcard: false
})

fastify.get("/dashboard/*", (_req, reply) => {
    reply.sendFile("index.html")
})

fastify.get("/dashboard", (_req, reply) => {
    reply.sendFile("index.html")
})

fastify.listen(process.env.PORT, process.env.HOST).then(() => {
    console.log(`Serving frontend on port ${process.env.PORT}`)
})
