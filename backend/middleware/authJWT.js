// This middleware checks whether  user has a valid JWT token before allowing access to a protected route.
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/sendResponse");

const authJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log("req ---", req.headers);
    // console.log("req body ---", req.body);
    if (!authHeader) {
      return sendResponse(res, {
        success: false,
        status_code: 401,
        message: "Authorization header is required",
      });
    }
    const token = authHeader.split(" ")[1];
    // console.log("token---", token);
    if (!token) {
      return sendResponse(res, {
        success: false,
        status_code: 401,
        message: "Token is required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return sendResponse(res, {
        success: false,
        status_code: 401,
        message: "Token expired",
      });
    }
    console.log(error);
    return sendResponse(res, {
      success: false,
      status_code: 401,
      message: "Invalid token",
    });
  }
};

module.exports = authJWT;
