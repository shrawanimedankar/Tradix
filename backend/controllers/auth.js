const bcrypt = require("bcrypt");
const { UserModel } = require("../model/User");
const { sendResponse } = require("../utils/sendResponse");

const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return sendResponse(res, {
      success: true,
      status_code: 201,
      message: "Account created successfully",
      data: {
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);

    return sendResponse(res, {
      success: false,
      status_code: 500,
      message: "Something went wrong",
      error,
    });
  }
};

const login = async (req, res) => {};

module.exports = {
  signup,
  login,
};
