const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
  },

  price: {
    type: Number,
  },

  size: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Size',
    },
  ],

  color: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Color',
    },
  ],

  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],

  creationDate: {
    type: Date,
    default: Date.now,
  },

  quantity: {
    type: Number,
    default: 0,
  },

  totalPurchase: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ['On stock', 'Out of stock', 'Suspend'],
  },

  productImage: [
    {
      type: String,
    },
  ],
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
