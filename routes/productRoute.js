const express = require("express");
const { getAllProducts, createProduct, getProduct, updateProduct } = require("../controllers/productController");

const router = express.Router()

router
    .route('/')
    .get(getAllProducts)
    .post(createProduct)
router
    .route('/:id')
    .get(getProduct)
    .post(updateProduct)

module.exports = router;