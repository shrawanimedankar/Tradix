const express = require("express");
const router = express.Router();
const { getAllHoldings } = require("../controllers/holdings");

router.get("/allHoldings", getAllHoldings);

module.exports = router;