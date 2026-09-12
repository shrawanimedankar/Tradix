const { PositionsModel } = require("../model/Positions");
const { sendResponse } = require("../utils/sendResponse");

const getPositions = async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({ user: req.user.userId });

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
};

module.exports = {
  getPositions,
};
