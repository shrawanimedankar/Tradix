const express = require("express");
const router = express.Router();
const { getAllOrders, newOrder } = require("../controllers/orders");
const authJWT = require("../middleware/authJWT");

router.get("/", authJWT, getAllOrders);
router.post("/new", authJWT, newOrder);

module.exports = router;
