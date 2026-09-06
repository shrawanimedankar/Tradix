const { model } = require("mongoose");
const { PositionsSchema } = require("../schemas/Positions");

const PositionsModel = new model("position", PositionsSchema);

module.exports = { PositionsModel };
