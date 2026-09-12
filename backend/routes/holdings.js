const express = require("express");
const router = express.Router();
const { getHoldings } = require("../controllers/holdings");
const authJWT = require("../middleware/authJWT");

router.get("/", authJWT, getHoldings);

module.exports = router;
