if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const { sendResponse } = require("./utils/sendResponse");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);

const { HoldingsModel } = require("./model/Holdings");
const { PositionsModel } = require("./model/Positions");
const { OrdersModel } = require("./model/Orders");
const { FundsModel } = require("./model/Funds");
const {UserModel} = require("./model/User");

const PORT = process.env.PORT || 8080;
const dbUrl = process.env.MONGODB_URL;

main()
  .then(() => console.log("Connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}


app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});

    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Holdings fetched successfully",
      data: allHoldings,
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
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});

    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Positions fetched successfully",
      data: allPositions,
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
});

app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});

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
});

app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode, product } = req.body;
  const funds = await FundsModel.findOne();
  const totalAmount = price * qty;

  // BUY
  try {
    if (mode === "BUY") {
      // CHECK FUNDS
      if (funds.availableFunds < totalAmount) {
        return sendResponse(res, {
          success: false,
          status_code: 400,
          message: "Insufficient funds",
        });
      }
      // DEDUCT MONEY
      funds.availableFunds -= totalAmount;
      funds.usedFunds += totalAmount;

      await funds.save();

      // CNC → HOLDINGS
      if (product === "CNC") {
        const holding = await HoldingsModel.findOne({ name });

        if (holding) {
          const totalCost = holding.avg * holding.qty + price * qty;
          const totalQty = holding.qty + qty;

          holding.avg = totalCost / totalQty;
          holding.qty = totalQty;
          holding.price = price;

          await holding.save();
        } else {
          const newHolding = new HoldingsModel({
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
        const position = await PositionsModel.findOne({ name });

        if (position) {
          const totalCost = position.avg * position.qty + price * qty;
          const totalQty = position.qty + qty;

          position.avg = totalCost / totalQty;
          position.qty = totalQty;
          position.price = price;

          await position.save();
        } else {
          const newPosition = new PositionsModel({
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
      // ADD SELL MONEY TO FUNDS
      const totalAmount = price * qty;

      funds.availableFunds += totalAmount;
      funds.usedFunds -= totalAmount;

      await funds.save();
      // CNC → HOLDINGS
      if (product === "CNC") {
        const holding = await HoldingsModel.findOne({ name });

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
          await HoldingsModel.deleteOne({ name });
        } else {
          await holding.save();
        }
      }

      // MIS → POSITIONS
      if (product === "MIS") {
        const position = await PositionsModel.findOne({ name });

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
          await PositionsModel.deleteOne({ name });
        } else {
          await position.save();
        }
      }
    }

    // SAVE ORDER
    const newOrder = new OrdersModel({
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
});

app.get("/funds", async (req, res) => {
  try {
    let funds = await FundsModel.findOne();
    if (!funds) {
      funds = new FundsModel({
        availableFunds: 100000,
        usedFunds: 0,
        openingBalance: 100000,
        payin: 0,
      });
      await funds.save();
    }
    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Funds fetched successfully",
      data: funds,
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
});

app.post("/addFunds", async (req, res) => {
  const { amount } = req.body;

  try {
    const funds = await FundsModel.findOne();
    const addAmount = Number(amount);

    if (!funds) {
      return sendResponse(res, {
        success: false,
        status_code: 404,
        message: "Funds not found",
      });
    }

    if (!addAmount || addAmount <= 0) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Enter a valid amount",
      });
    }

    funds.availableFunds += addAmount;
    funds.payin += addAmount;

    await funds.save();

    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Funds added successfully",
      data: funds,
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
});

app.post("/withdrawFunds", async (req, res) => {
  const { amount } = req.body;

  try {
    const funds = await FundsModel.findOne();
    const withdrawAmount = Number(amount);

    if (!funds) {
      return sendResponse(res, {
        success: false,
        status_code: 404,
        message: "Funds not found",
      });
    }

    if (!withdrawAmount || withdrawAmount <= 0) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Enter a valid amount",
      });
    }

    if (withdrawAmount > funds.availableFunds) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Insufficient funds",
      });
    }

    funds.availableFunds -= withdrawAmount;
    funds.payin -= withdrawAmount;

    await funds.save();

    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Funds withdrawn successfully",
      data: funds,
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
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];
//   tempPositions.forEach((item) => {
//     let newPositions = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });
//     newPositions.save();
//   });
//   res.send("Done");
// });
