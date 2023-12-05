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
  },

  getProductDetail(id, page) {
    page = page - 1
    
    // return Product.find({_id: id}, { "review": { $slice: [page * productService.reviewsPerPage, productService.reviewsPerPage] } })
    //   .populate('category')
    //   .populate('color')
    //   .populate('size')
    //   .populate('manufacturer')
    //   .populate('review.reviewer')
      
    return Product.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "colors",
          localField: "color",
          foreignField: "_id",
          as: "color",
        },
      },
      {
        $lookup: {
          from: "sizes",
          localField: "size",
          foreignField: "_id",
          as: "size",
        },
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
          category: 1,
          color: 1,
          size: 1,
          manufacturer: 1,
          totalReviews: {
            $size: "$review",
          },
          review: {
            $slice: ["$review", page*productService.reviewsPerPage, productService.reviewsPerPage],
          },
          creationDate: { $dateToString: { format: "%Y-%m-%d %H:%M", date: "$creationDate" }},
          totalPurchase: 1,
          status: 1,
          productImage: 1,
        },
      },
      {
        $unwind: {
          path: "$review",
          "preserveNullAndEmptyArrays": true
        }
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'review.reviewer',
          foreignField: '_id',
          as: 'reviewsInfo'
        }
      },
      {
        $unwind: {
          path: "$reviewsInfo",
          "preserveNullAndEmptyArrays": true
        }
      },
      {
        $group: {
          _id: "$_id",
          name: {$first: "$name"},
          price: {$first: "$price"},
          category: {$first: "$category"},
          color: {$first: "$color"},
          size: {$first: "$size"},
          manufacturer: {$first: "$manufacturer"},
          creationDate: {$first: "$creationDate"},
          totalPurchase: {$first: "$totalPurchase"},
          status: {$first: "$status"},
          productImage: {$first: "$productImage"},
          totalReviews: {$first: "$totalReviews"},
          review: {
            $push: {
              _id: "$review._id",
              reviewer: "$reviewsInfo.name",
              title: "$review.title",
              content: "$review.content",
              rating: "$review.rating",
              reviewTime: { $dateToString: { format: "%Y-%m-%d %H:%M", date: "$review.reviewTime" }}
            }
          }
        }
      }
    ]);
  },

  addReview(product, review, reviewer) {
    review.reviewer = reviewer
    console.log(review)
    product.review.push(review)
    return product.save()
  },
}

module.exports = productService
