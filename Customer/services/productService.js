const Product = require('../models/product')
const Customer = require('../models/customer')
const mongoose = require('mongoose')

const productService = {
  productsPerPage: 5,

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
    .limit(12)
    .populate('manufacturer')
    .lean()
    return products
  },

  getProductById(id) {
    const foundProduct = Product.findById(id)
    return foundProduct
  },

  getProductDetail(id) {
    return Product.findById(id)
                  .populate('manufacturer')
                  .populate('category')
                  .populate('color')
                  .populate('size')
                  .lean()
  },

  generatePipelineGetProducts(page, productName, category, manufacturer, priceMin, priceMax, sort) {
    page = page - 1
    productName = productName || ''
    if(category) {
      if(!Array.isArray(category)) {
        category = [category]
      }
      else
        category = category
    }
    else
      category = []

    if(manufacturer) {
      if(!Array.isArray(manufacturer)) {
        manufacturer = [manufacturer]
      }
      else
        manufacturer = manufacturer
    }
    else
      manufacturer = []

    priceMin = parseInt(priceMin) || 100000
    priceMax = parseInt(priceMax) || 9000000
    sort = sort || 'none'

    const pipeline =
      [
        {
          $match: {
            name: {
              $regex: productName,
              $options: "i",
            },
            price: {
              $gte: priceMin,
              $lte: priceMax,
            },
          },
        },
        {
          $lookup:
            {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            },
        },
        {
          $lookup:
            {
              from: "manufacturers",
              localField: "manufacturer",
              foreignField: "_id",
              as: "manufacturer",
            },
        },
        {
          $unwind:
            {
              path: "$manufacturer",
              preserveNullAndEmptyArrays: true,
            },
        },
      ]
    
    if(category.length > 0) {
      pipeline.push(
        {
          $match:
            {
              "category.name": {
                $in: category,
              },
            },
        },
      )
    }
    if(manufacturer.length > 0) {
      pipeline.push(
        {
          $match:
            {
              "manufacturer.name": {
                $in: manufacturer,
              },
            },
        },
      )
    }
    if(sort == 'newest') {
      pipeline.push(
        {
          $sort: {
            creationDate: -1,
          },
        },
      )
    }
    else if(sort == 'oldest') {
      pipeline.push(
        {
          $sort: {
            creationDate: 1,
          },
        },
      )
    }
    else if(sort == 'low-high') {
      pipeline.push(
        {
          $sort: {
            price: 1,
          },
        },
      )
    }
    else if(sort == 'high-low') {
      pipeline.push(
        {
          $sort: {
            price: -1,
          },
        },
      )
    }

    return {pipeline, query: {page, productName, category, manufacturer, priceMin, priceMax, sort}}
  },

  getProductsWithCondition(page, productName, category, manufacturer, priceMin, priceMax, sort) {
    const {pipeline, query} = productService.generatePipelineGetProducts(page, productName, category, manufacturer, priceMin, priceMax, sort)    

    pipeline.push(
      {
        $skip: query.page*productService.productsPerPage,
      },
      {
        $limit: productService.productsPerPage,
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          productImage: 1,
          status: 1,
          manufacturer: 1,
          category: 1,
        },
      },
    )
    const products = Product.aggregate(pipeline)
    return products
  },

  getTotalProductsWithCondition(page, productName, category, manufacturer, priceMin, priceMax, sort) {
    const {pipeline, query} = productService.generatePipelineGetProducts(page, productName, category, manufacturer, priceMin, priceMax, sort)

    pipeline.push(
      {
        $count: "totalCount",
      },
    )
    const productsCount = Product.aggregate(pipeline)
    return productsCount
  },

  // updateProductQuantity: async(productId, amount) => {
  //   const update = { quantity: quantity - amount, totalPurchase: totalPurchase + amount};
  //   const product = await Product.findByIdAndUpdate(productId, update)
  //   product.save()
  // }
}

module.exports = productService
