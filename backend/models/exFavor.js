const { Schema, model } = require("mongoose");

const exFavorScheme = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = model('exFavor', exFavorScheme);
