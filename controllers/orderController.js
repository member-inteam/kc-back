const factory = require('./handlerFactory');
const Order = require('../models/orderModel')

exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
exports.createOrder = factory.createOne(Order);
exports.updateOrder = factory.updateOne(Order);
// exports.deleteOrder = factory.deleteOne(Order);