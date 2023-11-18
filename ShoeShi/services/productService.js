const Product = require('../models/product')

const productService = {
  getAllProducts() {
    const products = Product.find()
    return products
  },

  addProduct(product) {
    const newProduct = new Product(product)
    const savedProduct = newProduct.save()
    return savedProduct
  },

  updateProduct(id, product) {
    const Product = Product.findByIdAndUpdate(id, product)
    return Product
  },

  deleteProduct(id) {
    const Product = Product.findByIdAndDelete(id)
    return Product
  },
}

module.exports = productService
