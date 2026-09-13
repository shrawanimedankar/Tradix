const express = require("express");
const router = express.Router();

const {signup, login, getCurrentUser} = require("../controllers/auth");
const authJWT = require("../middleware/authJWT");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authJWT, getCurrentUser);

module.exports = router;