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

  addProductToCart(cart, product) {
    const newProduct = new Object({
      product: product.product,
      quantity: product.quantity,
      size: product.size,
      color: product.color,
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
}

module.exports = cartService
