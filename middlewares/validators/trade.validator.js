const __ = require('../../util/response.util')
const joi = require('joi')

async function createTrade (req, res, next) {
  const schema = joi.object().keys({
    type: joi.string().required(),
    ticker: joi.string().required(),
    averageBuyPrice: joi.number().required(),
    shares: joi.number().required()
  })

  try {
    const result = await joi.validate(req.body, schema)
    if (result) return next()
  } catch (error) {
    __.errorMsg(req, res, 400, error.details[0].message, error)
  }
}

async function updateTrade (req, res, next) {
  const schema = joi.object().keys({
    type: joi.string().optional(),
    ticker: joi.string().optional(),
    averageBuyPrice: joi.number().optional(),
    shares: joi.number().optional()
  })

  try {
    const result = await joi.validate(req.body, schema)
    if (result) return next()
  } catch (error) {
    __.errorMsg(req, res, 400, error.details[0].message, error)
  }
}

module.exports = {
  createTrade,
  updateTrade
}
