const mongoose = require('mongoose')
const Schema = mongoose.Schema

const security = Schema({
  ticker: {
    type: String,
    required: true
  },
  averageBuyPrice: {
    type: Number,
    required: true
  },
  shares: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Security', security, 'securities') // ( ModelName, Schema, CollectionName )
