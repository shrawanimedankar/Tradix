const { Schema } = require("mongoose");

const FundsSchema = new Schema({
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  openingBalance: {
    type: Number,
    default: 100000,
  },

  availableFunds: {
    type: Number,
    default: 100000,
  },

  usedFunds: {
    type: Number,
    default: 0,
  },

  payin: {
    type: Number,
    default: 0,
  },
});

module.exports = { FundsSchema };