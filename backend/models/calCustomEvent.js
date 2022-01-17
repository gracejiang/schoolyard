const { Schema, model } = require('mongoose')

const calCustomEventSchema = new Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  is_free_block: { type: Boolean, required: true },
  is_recurring: { type: Boolean, required: true },
  is_endless: { type: Boolean },
  is_all_day: { type: Boolean, required: true },
  recur_days: { type: Array },
  recur_start_date: { type: Date },
  recur_end_date: { type: Date },
  start_date: { type: Date },
  end_date: { type: Date },
})

module.exports = model('CalCustomEvent', calCustomEventSchema)
