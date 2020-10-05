const express = require('express')
const app = express()

app.use('/trade', require('./trade.routes'))
app.use('/portfolio', require('./security.routes'))
app.use('/returns', require('./returns.routes'))

module.exports = app
