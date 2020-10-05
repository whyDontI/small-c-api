const express = require('express')
const app = express.Router()
const securityService = require('../services/security.service')
const __ = require('../util/response.util')

app.get('/', async (req, res) => {
  try {
    const { securityData, message, status } = await securityService._getSecurities(req.query)
    return __.successMsg(req, res, status, securityData, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.get('/:id', async (req, res) => {
  try {
    const { securityData, message, status } = await securityService.__getSecurityById(req.params.id)
    return __.successMsg(req, res, status, securityData, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

module.exports = app
