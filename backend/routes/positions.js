const express = require("express");
const router = express.Router();
const { getPositions } = require("../controllers/positions");
const authJWT = require("../middleware/authJWT");

router.get("/", authJWT, getPositions);

module.exports = router;