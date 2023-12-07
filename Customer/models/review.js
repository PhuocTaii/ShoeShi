const mongoose = require('mongoose')
const User = require('./customer')
const Product = require('./product')

const reviewSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },

    reviewer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    rating:{
        type: Number,
    },

    tittle:{
        type: String,
    },

    content:{
        type: String,
    },

    reviewTime: {
        type: Date,
        default: Date.now,
      },
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
