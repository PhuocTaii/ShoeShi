const Order = require('../models/order')
const Product = require('../models/product')
const Color = require('../models/color')
const Size = require('../models/size')
const orderService = {
  // Create a new order
  // Get all orders
  getAllOrders: async () => {
    return await Order.find().sort({ orderTime: -1 });
  },

  getAllOrderByFilter: async (filter) => {
    return await Order.find({ status: filter }).sort({ orderTime: -1 });
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
    for(let i = 0; i < orders.length; i++) {
      if(orders[i].status.toString() == 'Done') {
        revenue += orders[i].totalPrice
      }
    }
    return revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

  // Update an order
  updateOrder: async (id, data) => {
    return await Order.findByIdAndUpdate(id, { status: data })
  },

  // Delete an order
  deleteOrder: async (id) => {
    return await Order.findByIdAndDelete(id)
  },

  getChartDataByMonth: async(orders, months) => {
    const y = months.slice(0, 4)
    const m = months.slice(5)
    const dayOfMonth = new Date(y, m, 0).getDate()
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
  },

  getTableDataByMonth: async(orders, months, productsName) => {
    const y = months.slice(0, 4)
    const m = months.slice(5)
    for(let i = 0; i < orders.length; i++) {
      const year = orders[i].orderTime.getFullYear()
      const month = (orders[i].orderTime.getMonth() + 1).toString().padStart(2, '0')

      if(y == year && m == month){
        for(let j = 0; j < orders[i].productList.length; j++) {
          for(let k = 0; k < productsName.length; k++) {
            if(orders[i].productList[j].product.toString() == productsName[k].product.toString()) {
              productsName[k].count += orders[i].productList[j].quantity
              productsName[k].revenue += orders[i].productList[j].quantity * orders[i].productList[j].price
            }
          }
        }
      }
    }

    productsName.sort((a, b) => b.revenue - a.revenue);
    productsName = productsName.slice(0, 5)
    for(let i = 0; i < productsName.length; i++) {
      productsName[i].revenue = productsName[i].revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    return productsName
  }
}

module.exports = orderService
