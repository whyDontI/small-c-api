const trade = require('../models/trade.model')

/**
 *Get trades
 *@param {string} ticker
 *@return {Promise<mongoose.Query>}
 * */
function __getTrades ({
  ticker = undefined
}) {
  const queryObj = {}
  if (ticker) {
    queryObj.ticker = ticker
  }

  return trade.find(queryObj)
    .lean()
}

/**
 *Get trade by Id
 *
 *@param {string} id - Trade _id
 *
 *@return {Promise<mongoose.Query>}
 * */
function __getTradeById (id) {
  return trade.findOne({
    _id: id
  })
    .lean()
}

/**
 *Get trade by Ticker
 *
 *@param {string} ticker - Trade _ticker
 *
 *@return {Promise<mongoose.Query>}
 * */
function __getTradeByTicker (ticker) {
  return trade.findOne({
    ticker
  })
    .lean()
}

/**
 *Create New trade with provided details
 *
 *@param {object} tradeData - Trade Data object
 *@param {string} tradeData.type - Trade type 'BUY' / 'SELL'
 *@param {string} tradeData.ticker
 *@param {number} tradeData.averageBuyPrice
 *@param {number} tradeData.shares
 *
 *@return {Promise<mongoose.Query>}
 * */
function __insertTrade (tradeData) {
  return trade.create(tradeData)
}

/**
 *__updateTrade() Update trade
 *
 *@param {string} id
 *@param {object} data - Data to be updated
 *
 *@return {Promise<mongoose.Query>}
 * */
function __updateTrade (id, data) {
  return trade.updateOne({
    _id: id
  }, {
    $set: data
  })
}

/**
 *Delete trade
 *
 *@param {string} id - _id
 *
 *@return {Promise<mongoose.Query>}
 * */
function __deleteTrade (id) {
  return trade.deleteOne({
    _id: id
  })
}

module.exports = {
  __getTrades,
  __getTradeById,
  __getTradeByTicker,
  __insertTrade,
  __updateTrade,
  __deleteTrade
}
