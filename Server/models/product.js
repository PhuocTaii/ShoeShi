const mongoose = require('mongoose');
const Customer = require('../models/customer');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    category: {
        type: String,
    },

    manufacturer:{
        type: String,
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

            content:{
                type: String,
            },

            reviewTime:{
                type: Date,
                default: Date.now,
            },
        }
    ],

    type: [
        {
            size: {
                type: Number,
            },
            quantity: {
                type: Number,
            },
            color:{
                type: String,
            },
        }
    ],

    typeOfcustomer:{
        type: String,
    },
    
    creationDate: {
        type: Date,
        default: Date.now,
    },

    totalPurchase:{
        type: Number,
        default: 0,
    },

    status: {
        type: String,
    }
    /*image: {
        product image
    }*/
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;