const cartService = require('../services/cartService')
const User = require('../models/customer')
const Product = require('../models/product')
const Cart = require('../models/cart')
const colorSerice = require('../services/colorService')
const sizeService = require('../services/sizeService')

const cartController = {

  //Server side
  //GET all carts
  getAllCarts: async (req, res) => {
    try {
      const carts = await cartService.getAllCarts()
      if (!carts) {
        return res.status(500).json(err)
      }
      res.status(200).json(carts)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //ADD product to cart
  addProductToCart: async (req, res) => {
    try {
      const color = await colorSerice.findColorByName(req.body.color)
      const size = await sizeService.getSizeByNumber(req.body.size)
      const cart = await cartService.getOneCart(req.params.customerId)
      const savedCart = cartService.addProductToCart(
        cart,
        req.body,
        color,
        size
      )
      res.status(200).json(savedCart)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  //Change product to cart
  changeProductQuantity: async (req, res) => {
    try {
      const cart = await cartService.getOneCart(req.params.customerId)
      const savedcart = cartService.changeProductQuantity(
        req.params.productId,
        cart,
        req.body.quantity
      )
      res.status(200).json(savedcart)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  //Delete product from cart
  deleteProductFromCart: async (req, res) => {
    try {
      const cart = await cartService.getOneCart(req.params.customerId)

      const savedcart = cartService.deleteProductFromCart(
        cart,
        req.params.productId
      )
      res.status(200).json(savedcart)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //DELETE cart
  deleteCart: async (req, res) => {
    try {
      const cart = await cartService.deleteCart(req.params.customerId)
      if (!cart) {
        res.status(500).json(err)
      }
      res.status(200).json('The cart has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //Client side
  getCartPage: async(req, res) => {
    res.render('cart', {
      layout: 'main',
      extraStyles: 'cart.css',
    })
  }
}
module.exports = cartController