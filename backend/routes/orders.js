const express = require("express");

const router = express.Router();

const { getAllOrders, newOrder } = require("../controllers/orders");

router.get("/allOrders", getAllOrders);

router.post("/newOrder", newOrder);

module.exports = router;