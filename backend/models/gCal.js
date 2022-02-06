const { Schema, model } = require('mongoose')

const gCalSchema = new Schema({
  username: { type: String, required: true },
  gcalId: { type: String, required: true },
  gcalName: { type: String, required: true },
})

module.exports = model('GCal', gCalSchema)
