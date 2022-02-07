const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    school_affiiation: { type: String, required: true },
    grad_year: { type: String, required: true },
    major: { type: String, required: true },
    bio: { type: String, required: true },
    profile_photo: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
