const express = require('express')
const app = express.Router()
const securityService = require('../services/security.service')
const __ = require('../util/response.util')
const CURRENT_PRICE = 2000

app.get('/', async (req, res) => {
  try {
    const { securityData, status } = await securityService._getSecurities(req.query)

    if (status >= 400) {
      return __.successMsg(req, res, status, null, 'No data to generate returns')
    }
    const returnsData = securityData.reduce((accumulator, security) => {
      return accumulator + ((CURRENT_PRICE - security.averageBuyPrice) * security.shares)
    }, 0)
    return __.successMsg(req, res, status, returnsData, 'Returns returned successfully')
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

module.exports = app
