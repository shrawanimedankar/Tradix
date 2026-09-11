const { FundsModel } = require("../model/Funds");
const { sendResponse } = require("../utils/sendResponse");

const getFunds = async (req, res) => {
  try {
    const funds = await FundsModel.findOne({
      user: req.user.id,
    });

    if (!funds) {
      return sendResponse(res, {
        success: false,
        status_code: 404,
        message: "Funds account not found",
      });
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
};

const addFunds = async (req, res) => {
  const { amount } = req.body;

  try {
    const funds = await FundsModel.findOne({
      user: req.user.id,
    });

    if (!funds) {
      return sendResponse(res, {
        success: false,
        status_code: 404,
        message: "Funds account not found",
      });
    }

    if (!amount || amount <= 0) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Enter a valid amount",
      });
    }

    funds.availableFunds += Number(amount);
    funds.payin += Number(amount);

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
};

const withdrawFunds = async (req, res) => {
  const { amount } = req.body;

  try {
    const funds = await FundsModel.findOne({
      user: req.user.id,
    });

    if (!funds) {
      return sendResponse(res, {
        success: false,
        status_code: 404,
        message: "Funds account not found",
      });
    }

    if (!amount || amount <= 0) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Enter a valid amount",
      });
    }

    if (Number(amount) > funds.availableFunds) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Insufficient available funds",
      });
    }

    funds.availableFunds -= Number(amount);

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
};

module.exports = {
  getFunds,
  addFunds,
  withdrawFunds,
};
