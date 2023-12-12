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

  getOrderPage: async (req, res) => {
    res.render('order', {
      layout: 'main',
      extraStyles: 'order.css',
    })
  },
}

module.exports = orderController
