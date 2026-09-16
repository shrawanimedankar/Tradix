const { WatchlistModel } = require("../model/Watchlist");
const { sendResponse } = require("../utils/sendResponse");

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
    const { name, price, isDown, percent, day } = req.body;

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

    const stock = await WatchlistModel.create({
      user: req.user.userId,
      name,
      price,
      isDown,
      percent,
      day,
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
