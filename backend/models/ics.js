const { Schema, model } = require('mongoose')

const icsSchema = new Schema({
  username: { type: String, required: true },
  s3_ics_id: { type: String, unique: true, required: true },
  ics_name: { type: String, required: true },
})

module.exports = model('Ics', icsSchema)
