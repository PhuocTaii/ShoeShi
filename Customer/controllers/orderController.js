const orderService = require('../services/orderService')
const cartService = require('../services/cartService')
const userService = require('../services/userService')
const colorService = require('../services/colorService')
const sizeService = require('../services/sizeService')
const productService = require('../services/productService')

const orderController = {
  // POST a new order
  createOrder: async (req, res) => {
    try {
      const cart = await cartService.findCartById(req.params.cartID)
      var nameList = []
      var colorList = []
      var sizeList = []
      var priceList = []
      var TotalPrice = 0
      for (let i = 0; i < cart.productList.length; i++) {
        const product = await productService.getProductById(
          cart.productList[i].product
        )
        const color = await colorService.findColorById(
          cart.productList[i].color
        )
        const size = await sizeService.getSizeById(cart.productList[i].size)
        nameList.push(product.name)
        priceList.push(product.price)
        colorList.push(color.color)
        sizeList.push(size.size)
        TotalPrice += product.price * cart.productList[i].quantity
      }
      const user = await userService.getUserById(cart.customer)
      const newOrder = await orderService.createOrder(
        req.body,
        cart,
        user,
        nameList,
        colorList,
        sizeList,
        priceList,
        TotalPrice
      )
      const clearCart = await cartService.clearProductList(cart.customer)
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

  //Client side
  getAdminOrderPage: async (req, res) => {
    res.render('admin/orders', {
      layout: 'admin/layout/main',
      extraStyles: 'order.css',
    })
  },  

  getOrderPage: async (req, res) => {
    res.render('customer/order', {
      layout: 'customer/layout/main',
      extraStyles: 'order.css',
    })
  },
}

module.exports = orderController