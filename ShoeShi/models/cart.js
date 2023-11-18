const mongoose = require('mongoose')
const Customer = require('../models/customer')
const Product = require('../models/product')

const cartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  productList: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },

      quantity: {
        type: Number,
      },

      size: {
        type: Number,
      },

      color: {
        type: String,
      },
    },
  ],
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
