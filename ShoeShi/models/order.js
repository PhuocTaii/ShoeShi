const mongoose = require('mongoose')
const Customer = require('../models/customer')
const Product = require('../models/product')
const Cart = require('../models/cart')

const orderSchema = new mongoose.Schema({
  ProductList: [
    {
      product: {
        type: String
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

  buyer:{
    type: String,
  },

  address: {
    type: String,
  },

  phone: {
    type: String,
  },

  orderTime: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    default: 'Pending',
  },

})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
