const { model } = require("mongoose");
const { OrdersSchema } = require("../schemas/Orders.js");

const OrdersModel = new model("order", OrdersSchema);

module.exports = { OrdersModel };
