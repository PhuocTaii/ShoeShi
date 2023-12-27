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
      // const color = await colorSerice.findColorByName(req.body.color)
      // const size = await sizeService.getSizeByNumber(req.body.size)
      if(req.user){
        const cart = await cartService.getOneCart(req.user.id)
        const savedCart = cartService.addProductToCart(
          cart,
          req.params.productID,
          req.body.color,
          req.body.size
          )
        return res.status(200).json(savedCart)  
      }
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  //Change product to cart
  changeProductQuantity: async (req, res) => {
    try {
      const cart = await cartService.getOneCart(req.user.id)
      const savedcart = await cartService.changeProductQuantity(
        req.params.productId,
        cart,
        req.body.quantity,
        req.body.color,
        req.body.size
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

  //GET productList
  getProductList: async (req, res) => {
    try{
      const cart = await cartService.getOneCart(req.user.id);
      const productList = await cartService.getProductListById(cart)
      res.status(200).json(productList)
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  },

  //GET local cart
  getLocalCart: async (req, res) => {
    try{
      const productList = await cartService.getLocalCart(req.body)
      res.status(200).json(productList)
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  },
  //Client side
  getCartPage: async(req, res) => {
  try{
    if(req.user){
      const cart = await cartService.getOneCart(req.user.id);
      const productList = await cartService.getProductListById(cart)
      const orderSummary = await cartService.getOrderSummary(cart)
      res.render('cart', {
        productList,
        orderSummary,
        layout: 'main',
        extraStyles: 'cart.css',
        user: req.user
      })
    }
    else{
      res.render('cart', {
        layout: 'main',
        extraStyles: 'cart.css',
        user: null
      })
    }
  } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  },

}
module.exports = cartController