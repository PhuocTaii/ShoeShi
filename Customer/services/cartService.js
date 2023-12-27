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
    for(let i = 0; i < cart.productList.length; i++){
      if(cart.productList[i].product == product && cart.productList[i].color == color && cart.productList[i].size == size){
        cart.productList[i].quantity += 1
        cart.save()
        return cart
      }
    }
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

  changeProductQuantity: async(productId, cart, quantity, color, size) => {
    var details = []

    for (let i = 0; i < cart.productList.length; i++) {
      if (cart.productList[i].product == productId && cart.productList[i].size.toString() == size.toString() && cart.productList[i].color.toString() == color.toString()) {
        cart.productList[i].quantity = quantity
      }
      const prod = await productService.getProductById(cart.productList[i].product)
      const detail = {
        price: prod.price,
        product: cart.productList[i].product,
        quantity: cart.productList[i].quantity,
        color: cart.productList[i].color,
        size: cart.productList[i].size,
      }
      details.push(detail)

    }
    cart.save()
    return details
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

  findCartById(id) {
    const cart = Cart.findOne({customer: id})
    return cart
  },

  getOrderSummary: async (cart) => {
    const productList = cart.productList
    var tPrice = 0
    var tAmount = 0
    for(let i = 0; i < productList.length; i++){
      const pDetail = await productService.getProductById(productList[i].product)
      tPrice += pDetail.price * productList[i].quantity
      tAmount += Number(productList[i].quantity)
    }
    const total = tPrice + 20000
    const summary = {
      totalPrice: tPrice,
      totalAmount: tAmount,
      total: total,
    }
    return summary
  },

  getProductListById: async (cart) => {
    const productList = cart.productList
    var detailList = []
    for (let i = 0; i < productList.length; i++) {
      const prod = await productService.getProductById(productList[i].product)
      const clor = await colorService.findColorById(productList[i].color)
      const sze = await sizeService.getSizeById(productList[i].size)
      const qty = productList[i].quantity
      const productDetail = {
        id: prod._id + clor._id + sze._id,
        price: prod.price,
        image: prod.productImage[0],
        product: prod.name,
        productID: prod._id,
        color: clor.color,
        size: sze.size,
        quantity: qty,
        colorId: clor._id,
        sizeId: sze._id,
      }
      detailList.push(productDetail)
    }
    return detailList
  },

  getProductListByIdForCheckout: async (cart) => {
    // Assuming cartService.getOneCart returns a promise
    const productList = cart.productList
    var detailList = []
    for (let i = 0; i < productList.length; i++) {
      const prod = await productService.getProductById(productList[i].product)
      const clor = await colorService.findColorById(productList[i].color)
      const sze = await sizeService.getSizeById(productList[i].size)
      const qty = productList[i].quantity
      const productDetail = {
        id: prod._id + clor._id + sze._id,
        price: prod.price * qty,
        image: prod.productImage[0],
        product: prod.name,
        productID: prod._id,
        color: clor.color,
        size: sze.size,
        quantity: qty,
        colorId: clor._id,
        sizeId: sze._id,
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
        id: prod._id + clor._id + sze._id,
        price: prod.price,
        image: prod.productImage[0],
        product: prod.name,
        productID: prod._id,
        color: clor.color,
        size: sze.size,
        quantity: qty,
        colorId: clor._id,
        sizeId: sze._id,
      }
      totalAmount += Number(qty)
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
