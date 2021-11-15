const { Schema, model } = require('mongoose')

const classSchema = new Schema({
  department: { type: String, required: true },
  number: { type: Number, required: true },
  title: { type: String, required: true },
})

module.exports = model('Class', classSchema)
