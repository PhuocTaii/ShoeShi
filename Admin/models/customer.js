const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
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

  isBan: {
    type: Boolean,
    default: false,
  },
})

const Customer = mongoose.model('Customer', customerSchema)
customerSchema.pre('remove', async function (next) {
  try {
    await Cart.deleteOne({ customer: this._id });
    await Order.deleteMany({ user: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = Customer
