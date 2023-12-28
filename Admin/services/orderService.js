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

  //Get total revenue
  getRevenue: async () => {
    var revenue = 0
    const orders = await orderService.getAllOrders()
    console.log(orders)
    for(let i = 0; i < orders.length; i++) {
      // // const date = new Date(orders[i].createTime).toLocaleDateString('en-us')
      // console.log(orders[i].orderTime.toLocaleDateString('en-us'))
      // // console.log(new Date(orders[i].orderTime))
      // // console.log(orders[i].createTime)
      if(orders[i].status.toString() == 'Done') {
        revenue += orders[i].totalPrice
      }
    }
    return revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

  //GET orders by day
  // getOrdersByDay: async (day) => {
  //   const orders = await orderService.getAllOrders()
  //   var count = 0
  //   for(let i = 0; i < orders.length; i++) {
  //     if(orders[i].orderTime.toLocaleDateString('en-us') == day) {
  //       count++
  //     }
  //   }
  //   return count
  // },

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
