const factory = require('./handlerFactory');
const Product = require('../models/productModel')

exports.getAllProducts = factory.getAll(Product);
exports.createProduct = factory.createOne(Product);
exports.getProduct = factory.getOne(Product);
exports.updateProduct = factory.updateOne(Product);