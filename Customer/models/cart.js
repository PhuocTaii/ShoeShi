const mongoose = require('mongoose')
const Customer = require('../models/customer')
const Product = require('../models/product')
const Color = require('../models/color')
const Size = require('../models/size')

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Size',
      },

      color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
      },
    },
  ],
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
