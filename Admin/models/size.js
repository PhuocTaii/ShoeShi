const mongoose = require('mongoose')

const sizeSchema = new mongoose.Schema({
  size: {
    type: Number,
    unique: true,
  },
})

const Size = mongoose.model('Size', sizeSchema)
sizeSchema.pre('remove', async function (next) {
  try {
    // Xóa tất cả các Cart có sản phẩm cần xóa từ productList
    await Cart.updateMany(
      { 'productList.product': this._id },
      { $pull: { productList: { size: this._id } } }
    );
    await Order.updateMany(
      { 'productList.product': this.size },
      { $pull: { productList: { size: this.size } } }
    );
    await Product.updateMany(
      { 'size': this._id },
      { $pull: { size: this._id } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = Size
