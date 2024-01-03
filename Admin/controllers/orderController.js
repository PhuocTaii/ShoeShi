const orderService = require('../services/orderService')
const userService = require('../services/userService')
const colorService = require('../services/colorService')
const sizeService = require('../services/sizeService')
const productService = require('../services/productService')

const orderController = {
  // GET all orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await orderService.getAllOrders()
      res.status(200).json(orders)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // GET an order by id
  getOrderById: async (req, res) => {
    try {
      const foundOrder = await orderService.getOrderById(req.params.id)
      if (!foundOrder) {
        return res.status(404).json('Order not found')
      }
      res.status(200).json(foundOrder)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // PUT update an order
  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await orderService.updateOrder(
        req.params.id,
        req.body.capitalizedStatus
      )
      res.status(200).json(updatedOrder)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // DELETE an order
  deleteOrder: async (req, res) => {
    try {
      await orderService.deleteOrder(req.params.id)
      res.status(200).json('Order has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //Client side
  getAdminOrderPage: async (req, res) => {
    res.render('orders', {
      layout: 'main',
      extraStyles: 'order.css',
    })
  },  

  getAllOrderByFilter: async (req, res) => {
    try {
      const orders = await orderService.getAllOrderByFilter(req.query.filterBy)
      res.status(200).json(orders)
    } catch (err) {
      res.status(500).json(err)
    }
  },
}

module.exports = orderController
