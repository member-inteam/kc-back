const express = require("express");
const { getAllOrders, getOrder, createOrder, updateOrder } = require("../controllers/orderController");

const router = express.Router()

router
    .route('/')
    .get(getAllOrders)
    .post(createOrder)
router
    .route('/:id')
    .get(getOrder)
    .post(updateOrder)

module.exports = router;