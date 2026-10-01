const { WatchlistModel } = require("../model/Watchlist");
const { sendResponse } = require("../utils/sendResponse");

const availableStocks = {
  INFY: {
    price: 1555.45,
    percent: "-1.60%",
    isDown: true,
  },

  TCS: {
    price: 3194.8,
    percent: "-0.25%",
    isDown: true,
  },

  WIPRO: {
    price: 577.75,
    percent: "0.32%",
    isDown: false,
  },

  "M&M": {
    price: 779.8,
    percent: "-0.01%",
    isDown: true,
  },

  RELIANCE: {
    price: 2112.4,
    percent: "1.44%",
    isDown: false,
  },

  HDFCBANK: {
    price: 1745.2,
    percent: "0.85%",
    isDown: false,
  },

  ICICIBANK: {
    price: 1298.6,
    percent: "-0.42%",
    isDown: true,
  },

  BHARTIARTL: {
    price: 1842.3,
    percent: "0.67%",
    isDown: false,
  },

  TATAMOTORS: {
    price: 728.45,
    percent: "-1.12%",
    isDown: true,
  },

  MARUTI: {
    price: 12450.75,
    percent: "0.35%",
    isDown: false,
  },

  HCLTECH: {
    price: 1542.8,
    percent: "-0.28%",
    isDown: true,
  },

  AXISBANK: {
    price: 1198.4,
    percent: "0.52%",
    isDown: false,
  },

  BAJFINANCE: {
    price: 9450.6,
    percent: "-0.73%",
    isDown: true,
  },

  TITAN: {
    price: 3655.25,
    percent: "1.08%",
    isDown: false,
  },

  PERSISTENT: {
    price: 5820.3,
    percent: "0.46%",
    isDown: false,
  },

  COFORGE: {
    price: 2145.7,
    percent: "-0.31%",
    isDown: true,
  },

  KOTAKBANK: {
    price: 1985.45,
    percent: "0.24%",
    isDown: false,
  },

  SBILIFE: {
    price: 1682.9,
    percent: "-0.18%",
    isDown: true,
  },

  SBIN: {
    price: 845.6,
    percent: "0.72%",
    isDown: false,
  },

  HINDUNILVR: {
    price: 2585.4,
    percent: "-0.36%",
    isDown: true,
  },

  ITC: {
    price: 412.75,
    percent: "0.28%",
    isDown: false,
  },

  LT: {
    price: 3745.8,
    percent: "0.91%",
    isDown: false,
  },

  SUNPHARMA: {
    price: 1842.65,
    percent: "-0.44%",
    isDown: true,
  },

  ADANIENT: {
    price: 2468.3,
    percent: "1.16%",
    isDown: false,
  },

  ADANIPORTS: {
    price: 1398.5,
    percent: "-0.27%",
    isDown: true,
  },

  TATASTEEL: {
    price: 168.45,
    percent: "0.63%",
    isDown: false,
  },

  TECHM: {
    price: 1685.2,
    percent: "-0.58%",
    isDown: true,
  },

  ULTRACEMCO: {
    price: 11245.6,
    percent: "0.34%",
    isDown: false,
  },

  ASIANPAINT: {
    price: 2485.75,
    percent: "-0.67%",
    isDown: true,
  },

  NTPC: {
    price: 342.8,
    percent: "0.48%",
    isDown: false,
  },

  POWERGRID: {
    price: 356.25,
    percent: "-0.22%",
    isDown: true,
  },

  JSWSTEEL: {
    price: 1085.4,
    percent: "0.76%",
    isDown: false,
  },

  HINDALCO: {
    price: 725.65,
    percent: "-0.39%",
    isDown: true,
  },

  ONGC: {
    price: 282.45,
    percent: "0.55%",
    isDown: false,
  },

  COALINDIA: {
    price: 465.8,
    percent: "-0.18%",
    isDown: true,
  },

  EICHERMOT: {
    price: 5485.3,
    percent: "0.42%",
    isDown: false,
  },

  BAJAJFINSV: {
    price: 1965.75,
    percent: "-0.51%",
    isDown: true,
  },
};

const getWatchlist = async (req, res) => {
  try {
    const watchlist = await WatchlistModel.find({
      user: req.user.userId,
    });

    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Watchlist fetched successfully",
      data: watchlist,
    });
  } catch (error) {
    return sendResponse(res, {
      success: false,
      status_code: 500,
      message: "Failed to fetch watchlist",
      error,
    });
  }
};

const addToWatchlist = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if stock exists
    if (!availableStocks[name]) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Stock not found",
      });
    }

    const existingStock = await WatchlistModel.findOne({
      user: req.user.userId,
      name,
    });

    if (existingStock) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Stock already exists in watchlist",
      });
    }

    const stockData = availableStocks[name];

    const stock = await WatchlistModel.create({
      user: req.user.userId,
      name,
      price: stockData.price,
      percent: stockData.percent,
      isDown: stockData.isDown,
    });

    return sendResponse(res, {
      success: true,
      status_code: 201,
      message: "Stock added to watchlist",
      data: stock,
    });
  } catch (error) {
    return sendResponse(res, {
      success: false,
      status_code: 500,
      message: "Failed to add stock",
      error,
    });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    const { name } = req.params;

    const stock = await WatchlistModel.findOneAndDelete({
      user: req.user.userId,
      name,
    });

    if (!stock) {
      return sendResponse(res, {
        success: false,
        status_code: 404,
        message: "Stock not found in watchlist",
      });
    }

    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Stock removed from watchlist",
    });
  } catch (error) {
    return sendResponse(res, {
      success: false,
      status_code: 500,
      message: "Failed to remove stock",
      error,
    });
  }
};

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
};
