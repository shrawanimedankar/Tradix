const { model } = require("mongoose");
const { HoldingsSchema } = require("../schemas/Holdings.js");

const HoldingsModel = new model("holding", HoldingsSchema);

module.exports = { HoldingsModel };
