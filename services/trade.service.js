const tradeQuery = require('../dataAdapter/mongo/query/trade.query')
const securityQuery = require('../dataAdapter/mongo/query/security.query')

/**
 * Get updated security
 *
 * @param {Object} oldSecurity
 * @param {Object} trade
 *
 * @return
*/

function getUpdatedSecurity (oldSecurity, trade) {
  const sum = (oldSecurity.averageBuyPrice * oldSecurity.shares) + (trade.averageBuyPrice * trade.shares)
  const newAverageBuyPrice = sum / (oldSecurity.shares + trade.shares)

  return {
    averageBuyPrice: newAverageBuyPrice,
    shares: oldSecurity.shares + trade.shares
  }
}

/**
 * Returns `averageBuyPrice` after reverting provided trade from security
 *
 * @param {Object} oldSecurity
 * @param {Object} trade
 *
 * @return {number} averageBuyPrice
  * */

function getRevertedSecurity (oldSecurity, trade) {
  const oldSum = oldSecurity.averageBuyPrice * oldSecurity.shares
  const y = oldSum - (trade.averageBuyPrice * trade.shares)
  const newAverageBuyPrice = y / (oldSecurity.shares - trade.shares)
  return {
    averageBuyPrice: newAverageBuyPrice,
    shares: oldSecurity.shares - trade.shares
  }
}

/**
 *Add new Trade
 *
 *@param {object} body - Express body object
 *@param {string} body.type - Trade type 'BUY' / 'SELL'
 *@param {string} body.ticker
 *@param {number} body.averageBuyPrice
 *@param {number} body.shares
 *
 *@return {Promise}
 * */
async function _addTrade ({
  type,
  ticker,
  averageBuyPrice,
  shares
}) {
  try {
    // Trade type BUY
    if ((type).toUpperCase() === 'BUY') {
      // Add new Trade
      const newTrade = await tradeQuery.__insertTrade({
        type: (type).toUpperCase(),
        ticker,
        averageBuyPrice,
        shares
      })

      // Fetch security if already present
      const security = await securityQuery.__getSecurities({ ticker })
      const oldSecurity = security[0]

      // Add security if not present
      if (!security.length) {
        await securityQuery.__insertSecurity({
          ticker,
          averageBuyPrice,
          shares
        })

        return Promise.resolve({ data: newTrade, message: 'Trade added successfully', status: 201 })
      }

      // Security is present
      // Update security with new Trade
      const newSecurityObject = getUpdatedSecurity(oldSecurity, {
        shares,
        averageBuyPrice
      })

      await securityQuery.__updateSecurity(oldSecurity.ticker, newSecurityObject)

      return Promise.resolve({ data: newTrade, message: 'Trade added successfully', status: 201 })
    } else if ((type).toUpperCase() === 'SELL') {
      // Fetch security if already present
      const security = await securityQuery.__getSecurities({ ticker })
      const oldSecurity = security[0]

      // If security not present, selling is not possible
      if (!security.length) {
        return Promise.resolve({ data: null, message: 'No shares available to sell', status: 400 })
      }

      await securityQuery.__updateSecurity(oldSecurity.ticker, {
        shares: oldSecurity.shares - shares
      })

      // Add new Trade
      const newTrade = await tradeQuery.__insertTrade({
        type: (type).toUpperCase(),
        ticker,
        averageBuyPrice,
        shares
      })

      return Promise.resolve({ data: newTrade, message: 'Trade added successfully', status: 201 })
    }
  } catch (error) {
    return Promise.reject(error)
  }
};

/**
 *Update Trade
 *@param {string} id
 *@param {object} newTradeData - Trade data to be updated
 *@return {Promise<Object>}
 * */
async function _updateTrade (id, newTradeData) {
  try {
    // Get trade if present
    const trade = await tradeQuery.__getTradeById(id)

    // Trade is present
    if (trade) {
      // Overwrite old trade with new trade
      const newTrade = Object.assign(trade, newTradeData)

      delete newTrade.createdAt
      delete newTrade.updatedAt
      delete newTrade.__v

      // Delete oldTrade and revert security
      const deletedTrade = await _deletedTrade(id)
      if (deletedTrade.status !== 200) {
        return Promise.resolve({ updatedTrade: null, message: deletedTrade.message, status: deletedTrade.status })
      }

      // Add (Update old trade) new trade with overwritten information
      const updatedTrade = await _addTrade(newTrade)
      return Promise.resolve({ updatedTrade, message: 'Updated trade successfully', status: 200 })
    } else {
      // Trade is not present in the system
      return Promise.resolve({ updatedTrade: null, message: 'Trade not found', status: 404 })
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 *Get One Trade
 *
 *@param {string} id
 *
 *@return {Promise<Object>}
 * */
async function _getOneTrade (id) {
  try {
    const tradeData = await tradeQuery.__getTradeById(id)
    if (!tradeData) { return Promise.resolve({ tradeData, message: 'Trade not found', status: 404 }) }
    return Promise.resolve({ tradeData, message: 'Trade Returned Successfully!', status: 200 })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 *Get Trades
 *@param {Object} req.query - Express req.query
 *@param {string} req.query.ticker
 *@return {Promise<Object>}
 * */
async function _getTrades ({
  ticker
}) {
  try {
    const tradeData = await tradeQuery.__getTrades({
      ticker
    })
    if (!tradeData.length) { return Promise.resolve({ tradeData, message: 'Trades not found', status: 404 }) }
    return Promise.resolve({ tradeData, message: 'Trades returned successfully', status: 200 })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 *Delete Trade
 *
 *@param {string} ticker
 *
 *@return {Promise<Object>}
 * */
async function _deletedTrade (id) {
  try {
    // Get trade to be deleted
    const trade = await tradeQuery.__getTradeById(id)

    // If trade does not exists return Error
    if (!trade) {
      return Promise.resolve({ deletedTrade: null, message: 'Trade not found', status: 404 })
    }

    // Get security with same ticker
    const security = await securityQuery.__getSecurities({
      ticker: trade.ticker
    })

    const oldSecurity = security[0]

    // If trade.type is SELL just substract shares from security
    if (trade.type === 'SELL') {
      await securityQuery.__updateSecurity(trade.ticker, {
        shares: oldSecurity.shares + trade.shares
      })
    } else if (trade.type === 'BUY') { // If trade.type BUY, revert the trade from security
      // Get reverted averageBuyPrice
      const newSecurityObject = getRevertedSecurity(oldSecurity, trade)

      await securityQuery.__updateSecurity(trade.ticker, newSecurityObject)
    }

    const deletedTrade = await tradeQuery.__deleteTrade(id)
    return Promise.resolve({ deletedTrade, message: 'Deleted Trade Successfully!', status: 200 })
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = {
  _addTrade,
  _updateTrade,
  _getOneTrade,
  _getTrades,
  _deletedTrade
}
