const Order = require('../models/order')
const Product = require('../models/product')
const Color = require('../models/color')
const Size = require('../models/size')
const productService = require('../services/productService')
const orderService = {
  // Create a new order
  createOrder: async (data, cart, user, nameList, colorList, sizeList, TotalPrice) => {
    var productList = []

    for(let i  = 0; i < cart.productList.length; i++){
      productList.push({
        product: nameList[i],
        quantity: cart.productList[i].quantity,
        size: sizeList[i],
        color: colorList[i],
      })
    }
    console.log(productList)
    const newOrder = new Order({
      productList: productList,
      buyer: user.name,
      address: data.address,
      phone: data.phone,
      totalPrice: TotalPrice,
    })
    const savedOrder = newOrder.save()
    return savedOrder
  },

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
