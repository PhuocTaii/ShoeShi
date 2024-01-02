const Product = require('../models/product')
const Customer = require('../models/customer')
const mongoose = require('mongoose')

const productService = {
  productsPerPage: 5,

  getAllProducts() {
    const products = Product.find()
    return products
  },

  addProduct(product) {
    const newProduct = new Product({
      ...product,
      creationDate: Date.now(),
    })
    return newProduct.save()
  },

  updateProduct(id, product) {
    const updateProduct = Product.findByIdAndUpdate(id, product)
    return updateProduct
  },

  deleteProduct(id) {
    const Product = Product.findByIdAndDelete(id)
    return Product
  },

  getProductById(id) {
    const foundProduct = Product
    .findById(id)
    .populate('category')
    .populate('manufacturer')
    .populate('size')
    .populate('color')
    .populate('color')
    .lean()
    return foundProduct
  },

  getProductByName(name){
    const foundProduct = Product.find({ name: { $regex: name, $options: 'i' } })
    return foundProduct
  },

  generatePipelineGetProducts(page, productName, category, manufacturer, sort) {
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

    sort = sort || 'none'

    const pipeline =
      [
        {
          $match: {
            name: {
              $regex: productName,
              $options: "i",
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
    else if(sort == 'purchase-min-max') {
      pipeline.push(
        {
          $sort: {
            totalPurchase: 1,
          },
        },
      )
    }
    else if(sort == 'purchase-max-min') {
      pipeline.push(
        {
          $sort: {
            totalPurchase: -1,
          },
        },
      )
    }

    return {pipeline, query: {page, productName, category, manufacturer, sort}}
  },

  getProductsWithCondition(page, productName, category, manufacturer, sort) {
    const {pipeline, query} = productService.generatePipelineGetProducts(page, productName, category, manufacturer, sort)    

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
          category: 1,
          manufacturer: 1,
          // creationDate: {
          //   $dateToString: {
          //     format: "%d-%m-%Y %H:%M",
          //     date: "$creationDate",
          //   },
          // },
          creationDate: 1,
          price: 1,
          quantity: 1,
          totalPurchase: 1,
          status: 1,
          productImage: 1,
        },
      },
    )
    const products = Product.aggregate(pipeline)
    return products
  },

  getTotalProductsWithCondition(page, productName, category, manufacturer, sort) {
    const {pipeline, query} = productService.generatePipelineGetProducts(page, productName, category, manufacturer, sort)

    pipeline.push(
      {
        $count: "totalCount",
      },
    )
    const productsCount = Product.aggregate(pipeline)
    return productsCount
  }
}

module.exports = productService