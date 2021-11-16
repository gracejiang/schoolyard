const { Schema, model } = require("mongoose");

const listingScheme = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = model('Listing', listingScheme);
