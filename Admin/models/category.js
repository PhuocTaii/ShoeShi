const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
})

const Category = mongoose.model('Category', categorySchema)
categorySchema.pre('remove', async function (next) {
  try {
    await Product.updateMany(
      { 'category': this._id },
      { $pull: { category: this._id } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = Category
