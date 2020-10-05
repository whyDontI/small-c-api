const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trade = Schema({
  type: {
    type: String,
    required: true
  },
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

module.exports = mongoose.model('Trade', trade, 'trades') // ( ModelName, Schema, CollectionName )
