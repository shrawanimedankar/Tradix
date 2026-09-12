const { HoldingsModel } = require("../model/Holdings");
const { sendResponse } = require("../utils/sendResponse");

const getHoldings = async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({
      user: req.user.userId,
    });

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
};

module.exports = {
  getHoldings,
};
