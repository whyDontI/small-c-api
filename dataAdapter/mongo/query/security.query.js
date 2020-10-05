const security = require('../models/security.model')

/**
 *Get securities
 *
 *@return {Promise<mongoose.Query>}
 * */
function __getSecurities ({
  ticker = undefined
}) {
  const queryObj = {}

  if (ticker) {
    queryObj.ticker = ticker
  }

  return security.find(queryObj)
    .lean()
}

/**
 *Get security by Id
 *
 *@param {string} id - Security _id
 *@return {Promise<mongoose.Query>}
 * */
function __getSecurityById (id) {
  return security.findOne({
    _id: id
  })
    .lean()
}

/**
 *Get security by Ticker
 *
 *@param {string} ticker - Security ticker
 *@return {Promise<mongoose.Query>}
 * */
function __getSecurityByTicker (ticker) {
  return security.findOne({
    ticker
  })
    .lean()
}

/**
 *Create New security with provided details
 *
 *@param {object} securityData - Security Data object
 *@param {string} securityData.type - Security type 'BUY' / 'SELL'
 *@param {string} securityData.ticker
 *@param {number} securityData.averageBuyPrice
 *@param {number} securityData.shares
 *
 *@return {Promise<mongoose.Query>}
 * */
function __insertSecurity (securityData) {
  return security.create(securityData)
}

/**
 *Update security
 *@param {string} ticker - Security ticker
 *@param {object} data - Data to be updated
 *@return {Promise<mongoose.Query>}
 * */
function __updateSecurity (ticker, data) {
  return security.updateOne({
    ticker
  }, {
    $set: data
  })
}

module.exports = {
  __getSecurities,
  __getSecurityById,
  __getSecurityByTicker,
  __insertSecurity,
  __updateSecurity
}
