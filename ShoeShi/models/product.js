const mongoose = require('mongoose')
const Customer = require('./customer')
const Size = require('./size')
const Color = require('./color')
const Category = require('./category')
const Manufacturer = require('./manufacturer')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  category: {
    type: String,
  },

  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
  },

  price: {
    type: Number,
  },

  review: [
    {
      reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
      },

      rating: {
        type: Number,
      },

      title: {
        type: String,
      },

      content: {
        type: String,
      },

      reviewTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  size:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Size',
  },

  color:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color',
  },

  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },

  typeOfcustomer: {
    type: String,
  },

  creationDate: {
    type: Date,
    default: Date.now,
  },

  totalPurchase: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
  },

  productImage: {
    type: String,
  },
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
