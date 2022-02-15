const http = require("http")
const config = require("./config")
const app = require('./app')

const server = http.createServer(app)

server.listen(config.SERVER_PORT, () => {
    console.log('App running on port: ' + config.SERVER_PORT)
})