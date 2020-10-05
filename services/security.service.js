const securityQuery = require('../dataAdapter/mongo/query/security.query')

/**
 *Get One Security
 *
 *@param {string} id
 *
 *@return {Promise<Object>}
 * */
async function _getOneSecurity (id) {
  try {
    const securityData = await securityQuery.__getSecurityById(id)
    if (!securityData) { return Promise.resolve({ securityData, message: 'Security not found', status: 400 }) }
    return Promise.resolve({ securityData, message: 'Security Returned Successfully!', status: 200 })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 *Get Securitys
 *@param {Object} req.query - Express req.query
 *@param {string} req.query.ticker
 *@return {Promise<Object>}
 * */
async function _getSecurities ({
  ticker = undefined
}) {
  try {
    const queryObject = {}
    if (ticker) {
      queryObject.ticker = ticker
    }

    const securityData = await securityQuery.__getSecurities(queryObject)
    if (!securityData.length) { return Promise.resolve({ securityData, message: 'Securities not found', status: 400 }) }
    return Promise.resolve({ securityData, message: 'Securities returned successfully', status: 200 })
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = {
  _getOneSecurity,
  _getSecurities
}
