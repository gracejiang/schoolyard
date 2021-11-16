const { Schema, model } = require("mongoose");

const exItemScheme = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = model('exItem', exItemScheme);
