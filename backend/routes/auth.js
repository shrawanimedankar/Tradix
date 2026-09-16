const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
} = require("../controllers/auth");
const authJWT = require("../middleware/authJWT");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authJWT, getCurrentUser);
router.put("/profile", authJWT, updateProfile);
router.put("/change-password", authJWT, changePassword);

module.exports = router;
