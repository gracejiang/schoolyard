const { Schema, model } = require('mongoose')

const groupSchema = new Schema(
  {
    group_name: { type: String, required: true },
    created_by: { type: String, required: true },
    description: { type: String, required: true },
    basic_info: { type: String, required: true },
    contact_email: { type: String, required: true },
    contact_number: { type: String, required: true },
    join_instructions: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = model('Group', groupSchema)