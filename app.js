const express = require('express')
const morgan = require('morgan')

const app = express()

const usersRoute = require('./routes/users')

app.use(morgan('dev'))

app.use('/users', usersRoute)

app.use((req, res) => {
    res.status(404).send({
        message : "Page not found."
    })
})

module.exports = app