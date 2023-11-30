const Product = require('../models/product')

const productService = {
  getAllProducts() {
    const products = Product.find()
    return products
  },

  addProduct(product, color, size, category) {
    const newProduct = new Product({
      category: category._id,
      creationDate: product.creationDate,
      manufacturer: product.manufacturer,
      name: product.name,
      price: product.price,
      status: product.status,
      totalPurchase: product.totalPurchase,
      
      
    })
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
