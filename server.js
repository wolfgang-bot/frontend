const fastify = require("fastify")()
const static = require("fastify-static")
const path = require("path")
require("dotenv").config()

const BUILD_DIR = path.join(__dirname, "build")

fastify.register(static, {
    root: BUILD_DIR,
    wildcard: false
})

fastify.get("/*", (_req, reply) => {
    reply.sendFile("index.html")
})

fastify.listen(process.env.PORT, process.env.HOST).then(() => {
    console.log(`Serving frontend on port ${process.env.PORT}`)
})
