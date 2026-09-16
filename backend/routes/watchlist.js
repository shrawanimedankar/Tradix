const express = require("express");
const router = express.Router();

const {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} = require("../controllers/watchlist");

const authJWT = require("../middleware/authJWT");

router.get("/", authJWT, getWatchlist);
router.post("/add", authJWT, addToWatchlist);
router.delete("/remove/:name", authJWT, removeFromWatchlist);

module.exports = router;
