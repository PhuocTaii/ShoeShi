const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },

    reviewer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },

    rating:{
        type: Number,
    },

    title:{
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
