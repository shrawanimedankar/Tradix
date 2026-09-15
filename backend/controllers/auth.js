const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/User");
const { sendResponse } = require("../utils/sendResponse");
const { signupSchema, loginSchema } = require("../validation/auth");
const { FundsModel } = require("../model/Funds");

const signup = async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);

    if (error) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: error.details[0].message,
      });
    }

    const { fullName, email, password } = value;

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

    const newFunds = new FundsModel({
      user: newUser._id,
    });
    await newFunds.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5d" },
    );

    return sendResponse(res, {
      success: true,
      status_code: 201,
      message: "Account created successfully",
      data: {
        fullName: newUser.fullName,
        email: newUser.email,
        token,
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

const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: error.details[0].message,
      });
    }

    const { email, password } = value;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return sendResponse(res, {
        success: false,
        status_code: 401,
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, {
        success: false,
        status_code: 401,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5d",
      },
    );

    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Login successful",
      data: {
        fullName: user.fullName,
        email: user.email,
        token,
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

const getCurrentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select(
      "fullName email",
    );

    if (!user) {
      return sendResponse(res, {
        success: false,
        status_code: 404,
        message: "User not found",
      });
    }

    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "User fetched successfully",
      data: {
        fullName: user.fullName,
        email: user.email,
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

const updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Full name and email are required",
      });
    }

    const existingUser = await UserModel.findOne({
      email,
      _id: { $ne: req.user.userId },
    });

    if (existingUser) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Email already registered",
      });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.user.userId,
      {
        fullName,
        email,
      },
      { new: true, runValidators: true },
    ).select("fullName email");

    if (!user) {
      return sendResponse(res, {
        success: false,
        status_code: 404,
        message: "User not found",
      });
    }

    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Profile updated successfully",
      data: {
        fullName: user.fullName,
        email: user.email,
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

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return sendResponse(res, {
        success: false,
        status_code: 400,
        message: "Current password and new password are required",
      });
    }

    const user = await UserModel.findById(req.user.userId);
    if (!user) {
      return sendResponse(res, {
        success: false,
        status_code: 404,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      return sendResponse(res, {
        success: false,
        status_code: 401,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return sendResponse(res, {
      success: true,
      status_code: 200,
      message: "Password changed successfully",
    });
  } 
  catch (error) {
    console.log(error);
    return sendResponse(res, {
      success: false,
      status_code: 500,
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = {
  signup,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
};
