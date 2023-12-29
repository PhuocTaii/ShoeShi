const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    // required: [true, 'Username is required'],
    validate: {
      validator: function(v) {
        return v.length >= 6 && v.length <= 20;
      },
      message: 'Username must be between 6 and 20 characters long'
    },
  },

  password: {
    type: String,
    // required: [true, 'Password is required'],
    validate: {
      validator: function(v) {
        return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(v);
      },
      message: 'Must be at least 8 characters. Include letters and numbers'
    },
  },

  admin: {
    type: Boolean,
    default: false,
    required: true,
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
    default: 'male',
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not supported'
    }
  },

  email: {
    type: String,
    // required: [true, 'Email is required'],
    validate: {
      validator: function(v) {
        return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: 'Email is invalid'
    },
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
  },

  googleId: {
    type: String,
  },
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
