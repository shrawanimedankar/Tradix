const { model } = require("mongoose");
const { FundsSchema } = require("../schemas/Funds");

const FundsModel = new model("fund", FundsSchema);

module.exports = { FundsModel };