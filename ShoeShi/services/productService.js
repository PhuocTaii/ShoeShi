const Product = require('../models/product')

const productService = {
  getAllProducts() {
    const products = Product.find()
    return products
  },

  addProduct(product, colorList, sizeList, categoryList, manufacturer) {
    cateList = []
    sList = []
    cList = []
    for(let i = 0; i < categoryList.length; i++){
        cateList.push(categoryList[i]._id)
    }
    for(let i = 0; i < sizeList.length; i++){
      sList.push(sizeList[i]._id)
    }
    for(let i = 0; i < colorList.length; i++){
      cList.push(colorList[i]._id)
    }
    const newProduct = new Product({
      category: cateList,
      creationDate: product.creationDate,
      manufacturer: manufacturer,
      name: product.name,
      price: product.price,
      status: product.status,
      totalPurchase: product.totalPurchase,
      review: product.review,
      color: cList,
      size: sList,
      totalPurchase: product.totalPurchase,
      productImage: product.productImage,
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

  getProductById(id){
    const foundProduct = Product.findById(id)
    return foundProduct
  },

}

module.exports = productService
