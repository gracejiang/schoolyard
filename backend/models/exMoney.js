const { Schema, model } = require("mongoose");

const exMoneyScheme = new Schema({
  amount: { type: Number, required: true },
});

module.exports = model('exMoney', exMoneyScheme);
