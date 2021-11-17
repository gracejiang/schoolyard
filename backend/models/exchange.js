const { Schema, model } = require('mongoose')

const exchangeScheme = new Schema({
  username: { type: String, required: true },
  exchangeType1: { type: ObjectId, required: True},
  exchangeType2: [{ type: ObjectId, required: True}]
})

module.exports = model('Exchange', exchangeScheme)
