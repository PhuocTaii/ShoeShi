const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
  color: {
    type: String,
    unique: true,
  },

  colorCode: {
    type: String,
    unique: true,
  },
})

const Color = mongoose.model('Color', colorSchema)
colorSchema.pre('remove', async function (next) {
  try {
    // Xóa tất cả các Cart có sản phẩm cần xóa từ productList
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
