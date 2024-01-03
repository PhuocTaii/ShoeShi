const mongoose = require('mongoose')
const Product = require('./product')

const manufacturerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
})

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema)
manufacturerSchema.pre('remove', async function (next) {
  try {
    await Product.deleteMany({ manufacturer: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = Manufacturer
