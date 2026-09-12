const { OrdersModel } = require("../model/Orders");
const { HoldingsModel } = require("../model/Holdings");
const { PositionsModel } = require("../model/Positions");
const { FundsModel } = require("../model/Funds");
const { sendResponse } = require("../utils/sendResponse");

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({ user: req.user.userId });

    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Orders fetched successfully",
      data: allOrders,
    });
  } catch (error) {
    console.log(error);

    return sendResponse(res, {
      success: false,
      status_code: 500,
      message: "Something went wrong",
      error: error,
    });
  }
};

const newOrder = async (req, res) => {
  const { name, qty, price, mode, product } = req.body;

  try {
    const funds = await FundsModel.findOne({
      user: req.user.userId,
    });
    const totalAmount = price * qty;

    // BUY
    if (mode === "BUY") {
      if (funds.availableFunds < totalAmount) {
        return sendResponse(res, {
          success: false,
          status_code: 400,
          message: "Insufficient funds",
        });
      }

      funds.availableFunds -= totalAmount;
      funds.usedFunds += totalAmount;
      await funds.save();

      // CNC → HOLDINGS
      if (product === "CNC") {
        const holding = await HoldingsModel.findOne({
          user: req.user.userId,
          name,
        });

        if (holding) {
          const totalCost = holding.avg * holding.qty + price * qty;
          const totalQty = holding.qty + qty;

          holding.avg = totalCost / totalQty;
          holding.qty = totalQty;
          holding.price = price;

          await holding.save();
        } else {
          const newHolding = new HoldingsModel({
            user: req.user.userId,
            name,
            qty,
            avg: price,
            price,
            net: "0.00%",
            day: "0.00%",
          });

          await newHolding.save();
        }
      }

      // MIS → POSITIONS
      if (product === "MIS") {
        const position = await PositionsModel.findOne({
          user: req.user.userId,
          name,
        });

        if (position) {
          const totalCost = position.avg * position.qty + price * qty;
          const totalQty = position.qty + qty;

          position.avg = totalCost / totalQty;
          position.qty = totalQty;
          position.price = price;

          await position.save();
        } else {
          const newPosition = new PositionsModel({
            user: req.user.userId,
            product: "MIS",
            name,
            qty,
            avg: price,
            price,
            net: "0.00%",
            day: "0.00%",
            isLoss: false,
          });

          await newPosition.save();
        }
      }
    }

    // SELL
    if (mode === "SELL") {
      // CNC → HOLDINGS
      if (product === "CNC") {
        const holding = await HoldingsModel.findOne({
          user: req.user.userId,
          name,
        });

        if (!holding) {
          return sendResponse(res, {
            success: false,
            status_code: 400,
            message: "You don't own this stock",
          });
        }

        if (holding.qty < qty) {
          return sendResponse(res, {
            success: false,
            status_code: 400,
            message: "Not enough quantity",
          });
        }

        holding.qty -= qty;

        if (holding.qty === 0) {
          await HoldingsModel.deleteOne({
            user: req.user.userId,
            name,
          });
        } else {
          await holding.save();
        }
      }

      // MIS → POSITIONS
      if (product === "MIS") {
        const position = await PositionsModel.findOne({
          user: req.user.userId,
          name,
        });

        if (!position) {
          return sendResponse(res, {
            success: false,
            status_code: 400,
            message: "You don't have an active position",
          });
        }

        if (position.qty < qty) {
          return sendResponse(res, {
            success: false,
            status_code: 400,
            message: "Not enough position quantity",
          });
        }

        position.qty -= qty;

        if (position.qty === 0) {
          await PositionsModel.deleteOne({
            user: req.user.userId,
            name,
          });
        } else {
          await position.save();
        }
      }

      funds.availableFunds += totalAmount;
      funds.usedFunds -= totalAmount;

      await funds.save();
    }

    const newOrder = new OrdersModel({
      user: req.user.userId,
      name,
      qty,
      price,
      mode,
      product,
    });
    await newOrder.save();

    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);

    return sendResponse(res, {
      success: false,
      status_code: 500,
      message: "Something went wrong",
      error: error,
    });
  }
};

module.exports = {
  getAllOrders,
  newOrder,
};
