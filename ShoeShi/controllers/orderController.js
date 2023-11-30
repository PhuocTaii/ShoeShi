const orderService = require('../services/orderService')
const cartService = require('../services/cartService')

const orderController = {
  // POST a new order
  createOrder: async (req, res) => {
    try {
      const cart = await cartService.findCartById(req.params.cartID)
      const newOrder = await orderService.createOrder(req.body, cart)
      res.status(200).json(newOrder)
    } catch (err) {
      res.status(500).json(err)
    }
  },

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
        req.body
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
}

module.exports = orderController
