const express = require('express')
const app = express.Router()
const tradeService = require('../services/trade.service')
const tradeValidator = require('../middlewares/validators/trade.validator')
const __ = require('../util/response.util')

app.get('/', async (req, res) => {
  try {
    const { tradeData, message, status } = await tradeService._getTrades(req.query)
    return __.successMsg(req, res, status, tradeData, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.get('/:id', async (req, res) => {
  try {
    const { tradeData, message, status } = await tradeService._getOneTrade(req.params.id)
    return __.successMsg(req, res, status, tradeData, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.post('/', tradeValidator.createTrade, async (req, res) => {
  try {
    const { data, message, status } = await tradeService._addTrade(req.body)
    return __.successMsg(req, res, status, data, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.patch('/:id', tradeValidator.updateTrade, async (req, res) => {
  try {
    const { updatedTrade, message, status } = await tradeService._updateTrade(req.params.id, req.body)
    return __.successMsg(req, res, status, updatedTrade, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.delete('/:id', async (req, res) => {
  try {
    const { message, status } = await tradeService._deletedTrade(req.params.id)
    return __.successMsg(req, res, status, {}, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

module.exports = app
