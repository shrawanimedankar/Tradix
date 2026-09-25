const { OrdersModel } = require("../model/Orders");
const { HoldingsModel } = require("../model/Holdings");
const { PositionsModel } = require("../model/Positions");
const { FundsModel } = require("../model/Funds");
const { sendResponse } = require("../utils/sendResponse");

const stockPrices = {
  INFY: 1555.45,
  TCS: 3194.8,
  WIPRO: 577.75,
  "M&M": 779.8,
  RELIANCE: 2112.4,
  HDFCBANK: 1745.2,
  ICICIBANK: 1298.6,
  BHARTIARTL: 1842.3,
  TATAMOTORS: 728.45,
  MARUTI: 12450.75,
  HCLTECH: 1542.8,
  AXISBANK: 1198.4,
  BAJFINANCE: 9450.6,
  TITAN: 3655.25,
  PERSISTENT: 5820.3,
  COFORGE: 2145.7,
  KOTAKBANK: 1985.45,
  SBILIFE: 1682.9,
  SBIN: 845.6,
  HINDUNILVR: 2585.4,
  ITC: 412.75,
  LT: 3745.8,
  SUNPHARMA: 1842.65,
  ADANIENT: 2468.3,
  ADANIPORTS: 1398.5,
  TATASTEEL: 168.45,
  TECHM: 1685.2,
  ULTRACEMCO: 11245.6,
  ASIANPAINT: 2485.75,
  NTPC: 342.8,
  POWERGRID: 356.25,
  JSWSTEEL: 1085.4,
  HINDALCO: 725.65,
  ONGC: 282.45,
  COALINDIA: 465.8,
  EICHERMOT: 5485.3,
  BAJAJFINSV: 1965.75,
};

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
  const { name, qty, mode, product } = req.body;

  try {
    // Validate quantity
    if (!Number.isInteger(qty) || qty < 1) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Quantity must be a positive whole number",
      });
    }

    // Validate price
    if (typeof price !== "number" || price <= 0) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Price must be greater than 0",
      });
    }

    // Validate mode
    if (!["BUY", "SELL"].includes(mode)) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Invalid order mode",
      });
    }

    // Validate product
    if (!["CNC", "MIS"].includes(product)) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Invalid product type",
      });
    }

    const price = stockPrices[name];

    if (!price) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Invalid stock name",
      });
    }

    const allowedStocks = [
      "INFY",
      "TCS",
      "WIPRO",
      "M&M",
      "RELIANCE",
      "HDFCBANK",
      "ICICIBANK",
      "BHARTIARTL",
      "TATAMOTORS",
      "MARUTI",
      "HCLTECH",
      "AXISBANK",
      "BAJFINANCE",
      "TITAN",
      "PERSISTENT",
      "COFORGE",
      "KOTAKBANK",
      "SBILIFE",
      "SBIN",
      "HINDUNILVR",
      "ITC",
      "LT",
      "SUNPHARMA",
      "ADANIENT",
      "ADANIPORTS",
      "TATASTEEL",
      "TECHM",
      "ULTRACEMCO",
      "ASIANPAINT",
      "NTPC",
      "POWERGRID",
      "JSWSTEEL",
      "HINDALCO",
      "ONGC",
      "COALINDIA",
      "EICHERMOT",
      "BAJAJFINSV",
    ];
    if (!allowedStocks.includes(name)) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Invalid stock name",
      });
    }

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
