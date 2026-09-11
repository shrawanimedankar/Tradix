const express = require("express");
const router = express.Router();
const { getFunds, addFunds, withdrawFunds } = require("../controllers/funds");

router.get("/", getFunds);
router.post("/add", addFunds);
router.post("/withdraw", withdrawFunds);

module.exports = router;
