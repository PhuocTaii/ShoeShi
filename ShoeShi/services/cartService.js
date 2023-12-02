const Cart = require('../models/cart')

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
      product: product.product,
      quantity: product.quantity,
      size: size._id,
      color: color._id,
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

  getProductListById(id) {
    const cart = cartService.findCartById(id)
    return cart.productList
  },
}

module.exports = cartService
