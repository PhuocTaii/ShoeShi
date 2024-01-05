const mongoose = require('mongoose')
const Customer = require('./customer')
const Size = require('./size')
const Product = require('./product')
const Cart = require('./cart')
const Order = require('./order')
const Category = require('./category')
const Manufacturer = require('./manufacturer')

const colorSchema = new mongoose.Schema({
  color: {
    type: String,
  },

  colorCode: {
    type: String,
  },
})

const Color = mongoose.model('Color', colorSchema)
colorSchema.pre('remove', async function (next) {
  try {
    await Cart.updateMany(
      { 'productList.product': this._id },
      { $pull: { productList: { color: this._id } } }
    );
    await Order.updateMany(
      { 'productList.product': this.color },
      { $pull: { productList: { color: this.color } } }
    );
    await Product.updateMany(
      { 'color': this._id },
      { $pull: { color: this._id } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = Color
