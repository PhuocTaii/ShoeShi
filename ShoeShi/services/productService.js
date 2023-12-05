const Product = require('../models/product')
const mongoose = require('mongoose')

const productService = {
  getAllProducts() {
    const products = Product.find()
    return products
  },

  getOtherProducts(id) {
    const products = Product.find({ _id: { $ne: id } })
    return products
  },

  getFeaturedProducts() {
    const products = Product.aggregate(
      [
        {
          $sort:
            {
              totalPurchase: -1,
            },
        },
        {
          $limit: 5,
        },
        {
          $lookup: {
            from: "manufacturers",
            localField: "manufacturer",
            foreignField: "_id",
            as: "manufacturer",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            price: 1,
            productImage: 1,
            status: 1,
            manufacturer: "$manufacturer.name",
          },
        },
        {
          $unwind: {
            path: "$manufacturer",
          },
        },
      ]
    )
    return products
  },

  getProductByFilter(query) {
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

    if (query.price) {
        conditions.price = { $gte: query.price.$gte, $lte: query.price.$lte };
    }

    const products = Product.find(conditions);
    return products;
  },
  

  sortProducts(sort) {
    if(sort == 'newest'){
      const products = Product.find().sort({creationDate: -1})
      return products
    }
    if(sort == 'oldest'){
      const products = Product.find().sort({creationDate: 1})
      return products
    }
    if(sort == 'low-high'){
      const products = Product.find().sort({price: 1})
      return products
    }
    if(sort == 'high-low'){
      const products = Product.find().sort({price: -1})
      return products
    }
  },

  getRelatedProducts(product, id){
    const products = Product.find({
      _id: { $ne: id },
      category: { $in: product.category }
    })
    .sort({ category: -1 })
    .limit(12);
    return products
  },

  getProductByFilter(query) {
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

    if (query.price) {
        conditions.price = { $gte: query.price.$gte, $lte: query.price.$lte };
    }

    const products = Product.find(conditions);
    return products;
  },
  

  sortProducts(sort) {
    if(sort == 'newest'){
      const products = Product.find().sort({creationDate: -1})
      return products
    }
    if(sort == 'oldest'){
      const products = Product.find().sort({creationDate: 1})
      return products
    }
    if(sort == 'low-high'){
      const products = Product.find().sort({price: 1})
      return products
    }
    if(sort == 'high-low'){
      const products = Product.find().sort({price: -1})
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
  }
}

module.exports = productService
