const { Schema } = require("mongoose");

const FundsSchema = new Schema({
  availableFunds: Number,
  usedFunds: Number,
  openingBalance: Number,
  payin: Number,
});

module.exports = { FundsSchema };