const Cart = require('../models/cart')
const colorService = require('./colorService')
const sizeService = require('./sizeService')
const productService = require('./productService')

const cartService = {
  getAllCarts() {
    const carts = Cart.find()
    return carts
  },

  getOneCart(customerId) {
    const cart = Cart.findOne({ customer: customerId })
    return cart
  },

  addProductToCart(cart, product, color, size) {
    const newProduct = new Object({
      product: product,
      quantity: 1,
      size: size,
      color: color,
    })
    cart.productList.push(newProduct)
    cart.save()
    return cart
  },

  changeProductQuantity(productId, cart, quantity) {
    for (let i = 0; i < cart.productList.length; i++) {
      if (cart.productList[i].product == productId) {
        cart.productList[i].quantity = quantity
        cart.save()
        return cart
      }
    }
    return null
  },

  deleteProductFromCart(cart, productId) {
    for (let i = 0; i < cart.productList.length; i++) {
      if (cart.productList[i].product == productId) {
        cart.productList.splice(i, 1)
        cart.save()
        return cart
      }
    }
    return null
  },

  deleteCart(customerId) {
    const cart = Cart.findOneAndDelete({ customer: customerId })
    return cart
  },

  clearProductList(customerId) {
    const clearCart = Cart.findOneAndUpdate(
      { customer: customerId },
      { productList: [] }
    )
    return clearCart
  },

  findCartById(cartId) {
    const cart = Cart.findById(cartId)
    return cart
  },

  getOrderSummary: async (cart) => {
    const productList = cart.productList
    var tPrice = 0
    var tAmount = 0
    for(let i = 0; i < productList.length; i++){
      const pDetail = await productService.getProductById(productList[i].product)
      tPrice += pDetail.price * productList[i].quantity
      tAmount += productList[i].quantity
    }
    const total = tPrice + 20000
    const summary = {
      totalPrice: tPrice,
      totalAmount: tAmount.toString(),
      total: total,
    }
    console.log(summary)
    return summary
  },

  getProductListById: async (cart) => {
    // Assuming cartService.getOneCart returns a promise
    const productList = cart.productList
    var detailList = []
    for (let i = 0; i < productList.length; i++) {
      const prod = await productService.getProductById(productList[i].product)
      console.log(prod)
      const clor = await colorService.findColorById(productList[i].color)
      const sze = await sizeService.getSizeById(productList[i].size)
      const qty = productList[i].quantity
      const productDetail = {
        price: prod.price,
        image: prod.productImage[0],
        product: prod.name,
        color: clor.color,
        size: sze.size,
        quantity: qty,
      }
      detailList.push(productDetail)
    }
    return detailList
  },

  getLocalCart: async (localCart) => {
    var totalAmount = 0
    var totalPrice = 0
    var detailList = []
    for (let i = 0; i < localCart.length; i++) {
      const prod = await productService.getProductById(localCart[i].productId)
      const clor = await colorService.findColorById(localCart[i].color)
      const sze = await sizeService.getSizeById(localCart[i].size)
      const qty = localCart[i].quantity
      const productDetail = {
        price: prod.price,
        image: prod.productImage[0],
        product: prod.name,
        color: clor.color,
        size: sze.size,
        quantity: qty,
      }
      totalAmount += qty
      totalPrice += qty * prod.price
      // productList[i].product = productDetail
      detailList.push(productDetail)
    }
    var total = totalPrice + 20000 
    totalPrice = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return {detailList, totalAmount, totalPrice, total}
  },

}

module.exports = cartService
