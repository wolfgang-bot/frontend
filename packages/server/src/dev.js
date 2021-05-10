const fastify = require("fastify")()
const proxy = require("fastify-http-proxy")

function getURL(port) {
    return `http://localhost:${port}`
}

fastify.register(proxy, {
    upstream: getURL(process.env.STATIC_PORT)
})

fastify.register(proxy, {
    upstream: getURL(process.env.DASHBOARD_PORT) + "/dashboard",
    prefix: "/dashboard"
})

fastify.listen(process.env.PORT, process.env.HOST).then(() => {
    console.log(`Serving frontend on port ${process.env.PORT}`)
})
