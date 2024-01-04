const checkoutService = require('../services/checkoutService')
const cartService = require('../services/cartService')
const userService = require('../services/userService')
const colorService = require('../services/colorService')
const sizeService = require('../services/sizeService')
const productService = require('../services/productService')

const checkoutController = {
  // POST a new order
  createOrder: async (req, res) => {
    try {
      const cart = await cartService.findCartById(req.user.id)
      var nameList = []
      var colorList = []
      var sizeList = []
      var priceList = []
      var TotalPrice = 0
      for (let i = 0; i < cart.productList.length; i++) {
        const product = await productService.getProductById(
          cart.productList[i].product
        )
        if(product.quantity < cart.productList[i].quantity){
          return res.status(400).json('Not enough product')
        }
        product.totalPurchase += cart.productList[i].quantity
        product.quantity -= cart.productList[i].quantity
        const color = await colorService.findColorById(
          cart.productList[i].color
        )
        const size = await sizeService.getSizeById(cart.productList[i].size)
        nameList.push(product.name)
        priceList.push(product.price)
        colorList.push(color.color)
        sizeList.push(size.size)
        TotalPrice += Number(product.price * cart.productList[i].quantity)
        product.save()
      }
      // const user = await userService.getUserById(req.user.id)
      const newOrder = await checkoutService.createOrder(
        req.body,
        req.user.id,
        cart,
        nameList,
        colorList,
        sizeList,
        priceList,
        TotalPrice
      )
      const clearCart = await cartService.clearProductList(req.user.id)
      res.status(200).json(newOrder)

    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  },

  // // GET an order by id
  // getOrderById: async (req, res) => {
  //   try {
  //     const foundOrder = await checkoutService.getOrderById(req.params.id)
  //     if (!foundOrder) {
  //       return res.status(404).json('Order not found')
  //     }
  //     res.status(200).json(foundOrder)
  //   } catch (err) {
  //     res.status(500).json(err)
  //   }
  // },

  getCheckoutPage: async (req, res) => {
    const cart = await cartService.getOneCart(req.user.id);
    const productList = await cartService.getProductListByIdForCheckout(cart)
    const orderSummary = await cartService.getOrderSummary(cart)
    const buyer = await userService.getUserById(req.user.id)
    const prodList = await cartService.getProductList(cart)
    res.render('checkout', {
      buyer,
      prodList,
      productList,
      orderSummary,
      layout: 'main',
      extraStyles: 'checkout.css',
      user: req.user
    })
  },
}

module.exports = checkoutController
