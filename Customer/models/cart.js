const mongoose = require('mongoose')
const Customer = require('./customer')
const Product = require('./product')
const Color = require('./color')
const Size = require('./size')

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
