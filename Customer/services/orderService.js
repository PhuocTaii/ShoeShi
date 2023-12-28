const productService = require('./productService')
const Order = require('../models/order')

const orderService = {
  getAllOrders() {
    const orders = Order.find()
    return orders
  },

  getAllOrderById(user) {
    const order = Order.find({ user })
      
    return order
  },

  findOrderById(id) {
    const order = Order.findOne({ _id: id })
    return order
  },
}

module.exports = orderService
