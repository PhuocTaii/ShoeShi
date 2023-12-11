const Product = require('../models/product')
const Customer = require('../models/customer')
const mongoose = require('mongoose')

const productService = {
  productsPerPage: 5,

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

  getRelatedProducts(product, id){
    const products = Product.find({
      _id: { $ne: id },
      category: { $in: product.category }
    })
    .sort({ category: -1 })
    .limit(6)
    .populate('manufacturer');
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

    if (query.price) {
        conditions.price = { $gte: query.price.$gte, $lte: query.price.$lte };
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

  getProductById(id) {
    const foundProduct = Product.findById(id)
    return foundProduct
  },

  getProductByName(name){
    const foundProduct = Product.find({ name: { $regex: name, $options: 'i' } })
    return foundProduct
  },

  getProductDetail(id) {
    return Product.findById(id)
                  .populate('manufacturer')
                  .populate('category')
                  .populate('color')
                  .populate('size')
                  .lean()
  }

  // addReview(product, review, reviewer) {
  //   review.reviewer = reviewer
  //   product.review.push(review)
  //   return product.save()
  // },
}

module.exports = productService
