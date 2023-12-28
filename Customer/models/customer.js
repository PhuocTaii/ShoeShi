const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 6,
    maxlength: 20,
    unique: true,
  },

  password: {
    type: String,
  },

  admin: {
    type: Boolean,
    default: false,
  },

  name: {
    type: String,
  },

  birthday: {
    type: Date,
  },

  phoneNum: {
    type: String,
  },

  gender: {
    type: String,
  },

  email: {
    type: String,
  },

  address: {
    type: String,
  },

  createTime: {
    type: Date,
    default: Date.now,
  },

  customerImage: {
    type: String,
    default: 'https://via.placeholder.com/100',
  },
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
