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

  getAllDoneOrders: async () => {
    return await Order.find({status: 'Done'})
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

  getDataByMonth: async(orders, months) => {
    const y = months.slice(0, 4)
    const m = months.slice(5)
    console.log(orders)
    console.log(y, m)
    const dayOfMonth = new Date(y, m, 0).getDate()
    console.log(dayOfMonth)
    var result = [dayOfMonth]
    for(let i = 0; i < dayOfMonth; i++) {
      result[i] = 0
    }
    for(let i = 0; i < orders.length; i++) {
      const year = orders[i].orderTime.getFullYear()
      const month = (orders[i].orderTime.getMonth() + 1).toString().padStart(2, '0')
      const day = orders[i].orderTime.getDate()
      const date = year + '-' + month

      if(date == months) {
        result[day - 1] += orders[i].totalPrice
      }
    }
    return result
  }
}

module.exports = orderService
