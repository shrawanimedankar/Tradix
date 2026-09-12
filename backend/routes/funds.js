const express = require("express");
const router = express.Router();
const { getFunds, addFunds, withdrawFunds } = require("../controllers/funds");
const authJWT = require("../middleware/authJWT");

router.get("/", authJWT, getFunds);
router.post("/add", authJWT, addFunds);
router.post("/withdraw", authJWT, withdrawFunds);

module.exports = router;
