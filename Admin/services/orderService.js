const Order = require('../models/order')
const Product = require('../models/product')
const Color = require('../models/color')
const Size = require('../models/size')
const orderService = {
  // Create a new order
  // Get all orders
  getAllOrders: async () => {
    return await Order.find()
  },

  // Get an order by id
  getOrderById: async (id) => {
    return await Order.findById(id)
  },

  // Update an order
  updateOrder: async (id, data) => {
    return await Order.findByIdAndUpdate(id, { $set: data })
  },

  // Delete an order
  deleteOrder: async (id) => {
    return await Order.findByIdAndDelete(id)
  },
}

module.exports = orderService