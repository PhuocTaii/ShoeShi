const Product = require('../models/product')
const Customer = require('../models/customer')
const mongoose = require('mongoose')

const productService = {
  productsPerPage: 5,
  reviewsPerPage: 2,

  getTotalProducts() {
    const totalProducts = Product.countDocuments()
    return totalProducts
  },

  getAllProducts() {
    const products = Product.find()
    return products
  },

  getProducts(page) {
    page = page - 1
    const products = Product.find()
      .skip(page * productService.productsPerPage)
      .limit(productService.productsPerPage)
    return products
  },

  getQuery(query) {
    const conditions = {};

    if (query.name) {
      conditions.name = { $regex: query.name, $options: 'i' };
    }

    if (query.category) {
        conditions.category = { $in: query.category };
    }

    if (query.manufacturer) { 
        conditions.manufacturer = { $in: query.manufacturer };
    }

    return conditions;
  },

  getProductByFilter(query, page) {
    page = page - 1
    const conditions = productService.getQuery(query);

    const products = Product.find(conditions)
                          .skip(page * productService.productsPerPage)
                          .limit(productService.productsPerPage)
                          .populate('manufacturer');
    return products;
  },

  getTotalFilteredProducts(query) {
    const conditions = productService.getQuery(query);
    const totalProducts = Product.countDocuments(conditions);
    return totalProducts;
  },
  
  sortProducts(sort, page) {
    page = page - 1
    if(sort == 'newest'){
      const products = Product.find().sort({creationDate: -1}).skip(page * productService.productsPerPage)
      .limit(productService.productsPerPage).populate('manufacturer')
      return products
    }
    if(sort == 'oldest'){
      const products = Product.find().sort({creationDate: 1}).skip(page * productService.productsPerPage)
      .limit(productService.productsPerPage).populate('manufacturer')
      return products
    }
    if(sort == 'low-high'){
      const products = Product.find().sort({price: 1}).skip(page * productService.productsPerPage)
      .limit(productService.productsPerPage).populate('manufacturer')
      return products
    }
    if(sort == 'high-low'){
      const products = Product.find().sort({price: -1}).skip(page * productService.productsPerPage)
      .limit(productService.productsPerPage).populate('manufacturer')
      return products
    }
  },

  addProduct(
    product,
    colorList,
    sizeList,
    categoryList,
    manufacturer,
    imageList
  ) {
    cateList = []
    sList = []
    cList = []
    iList = []
    for (let i = 0; i < categoryList.length; i++) {
      cateList.push(categoryList[i]._id)
    }
    for (let i = 0; i < sizeList.length; i++) {
      sList.push(sizeList[i]._id)
    }
    for (let i = 0; i < colorList.length; i++) {
      cList.push(colorList[i]._id)
    }
    for (let i = 0; i < imageList.length; i++) {
      iList.push(imageList[i])
    }
    const newProduct = new Product({
      category: cateList,
      creationDate: product.creationDate,
      manufacturer: manufacturer._id,
      name: product.name,
      price: product.price,
      status: product.status,
      totalPurchase: product.totalPurchase,
      review: product.review,
      color: cList,
      size: sList,
      totalPurchase: product.totalPurchase,
      productImage: iList,
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

  getProductById(id) {
    const foundProduct = Product.findById(id)
    return foundProduct
  },

  getProductByName(name){
    const foundProduct = Product.find({ name: { $regex: name, $options: 'i' } })
    return foundProduct
  },
}

module.exports = productService