const productService = require('../services/productService')
const colorService = require('../services/colorService')
const sizeService = require('../services/sizeService')
const categoryService = require('../services/categoryService')
const manufacturerService = require('../services/manufacturerService')
const imageService = require('../services/imageService')
const userService = require('../services/userService')


const productController = {
  //GET all products
  getAllProducts: async (req, res) => {
    try {
      const { 'product-name': productName, category, manufacturer, 'from-input': priceMin, 'to-input': priceMax, page } = req.query;

      const pageTo = parseInt(page) || 1

      const conditions = {};
      if(productName){
        conditions.name = productName
      }

      if (category){        
        conditions.category = []
        if(!Array.isArray(category)){
          const cateID = await categoryService.getCategoryByName(category)
          conditions.category.push(cateID)
        }
        else{
          for(cate of category){
            const cateID = await categoryService.getCategoryByName(cate)
            conditions.category.push(cateID)
          }
        }
      } 

      if(manufacturer){
        conditions.manufacturer = []
        if(!Array.isArray(manufacturer)){
          const manuID = await manufacturerService.findManufacturerByName(manufacturer)
          conditions.manufacturer.push(manuID)
        }
        else{
          for(manu of manufacturer){
            const manuID = await manufacturerService.findManufacturerByName(manu)
            conditions.manufacturer.push(manuID)
          }
        }
      }
      
      if(priceMin || priceMax) conditions.price = {}
      if (priceMin) conditions.price.$gte = parseInt(priceMin);
      if (priceMax) conditions.price.$lte = parseInt(priceMax);

      var products
      var totalProducts
      var totalPages

      if(conditions) {
        console.log(conditions)
        products = await productService.getProductByFilter(conditions, pageTo)
        totalProducts = await productService.getTotalFilteredProducts(conditions)
        totalPages = Math.ceil(totalProducts / productService.productsPerPage)
      }
      else {
        products = await productService.getProducts(pageTo)
        totalProducts = await productService.getTotalProducts()
        totalPages = Math.ceil(totalProducts / productService.productsPerPage)
      }

      const categories = await categoryService.getAllCategories()
      const manufacturers = await manufacturerService.getAllManufacturers()

      res.format({
        html: function () {
          res.render('customer/productList', {
            categories,
            manufacturers,
            products,
            totalPages,
            activePage: pageTo,
            layout: 'customer/layout/main',
            extraStyles: 'productList.css',
          });
        },
        json: function () {
          res.json({
            products,
            totalPages,
            activePage: pageTo
          });
        }
      });
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  },


  //GET products by filter
  getProductByFilter: async (req, res) => {
    try{
      const { 'product-name': productName, category, manufacturer, 'from-input': priceMin, 'to-input': priceMax } = req.query;

      const conditions = {};
      if(productName){
        conditions.name = productName
      }

      if (category){        
        conditions.category = []
        if(!Array.isArray(category)){
          const cateID = await categoryService.getCategoryByName(category)
          conditions.category.push(cateID)
        }
        else{
          for(cate of category){
            const cateID = await categoryService.getCategoryByName(cate)
            conditions.category.push(cateID)
          }
        }
      } 

      if(manufacturer){
        conditions.manufacturer = []
        if(!Array.isArray(manufacturer)){
          const manuID = await manufacturerService.findManufacturerByName(manufacturer)
          conditions.manufacturer.push(manuID)
        }
        else{
          for(manu of manufacturer){
            const manuID = await manufacturerService.findManufacturerByName(manu)
            conditions.manufacturer.push(manuID)
          }
        }
      }
      
      conditions.price = {};
      if (priceMin) conditions.price.$gte = parseInt(priceMin);
      if (priceMax) conditions.price.$lte = parseInt(priceMax);

      const products = await productService.getProductByFilter(conditions)
      
      res.json({
        products,
        totalPages,
        activePage: pageTo
      });
        
    } catch(err){
      res.status(500).json(err)
      console.log(err)
    }
  },

  //SORT products
  sortProducts: async (req, res) => {
    try{
      const { sort } = req.query;
      const products = await productService.sortProducts(sort)
      console.log(products)
      res.status(200).json(products)

    } catch(err){
      res.status(500).json(err)
    }
  },

  //Get related products
  getRelatedProducts: async(req, res) => {
    try{
      const product = await productService.getProductById(req.params.id)
      const sampleProd = await productService.getOtherProducts(req.params.id)
      const relatedProducts = await productService.getRelatedProducts(product, req.params.id)
      console.log(relatedProducts)
      res.status(200).json(123)
    } catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  },


  //ADD product
  addProduct: async (req, res) => {
    try {
      var colorArr = [],
        sizeArr = [],
        categoryArr = [],
        imageArr = []
      for (color of req.body.color) {
        const colorObj = await colorService.findColorByName(color)
        colorArr.push(colorObj)
      }
      for (size of req.body.size) {
        const sizeObj = await sizeService.getSizeByNumber(size)
        sizeArr.push(sizeObj)
      }
      for (category of req.body.category) {
        const categoryObj = await categoryService.getCategoryByName(category)
        categoryArr.push(categoryObj)
      }
      for (image of req.body.productImage) {
        imageUrl = await imageService.uploadImageToCloudinary(image)
        imageArr.push(imageUrl)
      }
      const manufacturer = await manufacturerService.findManufacturerByName(
        req.body.manufacturer
      )
      const savedProduct = await productService.addProduct(
        req.body,
        colorArr,
        sizeArr,
        categoryArr,
        manufacturer,
        imageArr
      )
      res.status(200).json(savedProduct)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //UPDATE product
  updateProduct: async (req, res) => {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      )
      if (!product) {
        return res.status(500).json(err)
      }
      res.status(200).json(product)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //DELETE product
  deleteProduct: async (req, res) => {
    try {
      const product = await productService.deleteProduct(req.params.id)
      if (!product) {
        res.status(500).json(err)
      }
      res.status(200).json('The product has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //Client side
  getProductPage: async (req, res) => {
    try {
    const products = await productService
      .getAllProducts()
      .populate('manufacturer')
    const categories = await categoryService
      .getAllCategories()
    const manufacturers = await manufacturerService
      .getAllManufacturers()
      res.render('customer/productList', {
        layout: 'customer/layout/main',
        extraStyles: 'productList.css',
        products, categories,manufacturers
      })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getProductDetailPage: async (req, res) => {
    res.render('customer/productDetail', {
      layout: 'customer/layout/main',
      extraStyles: 'productDetail.css',
    })
  },

  getAdminProductPage: async (req, res) => {
    res.render('admin/products', {
      layout: 'admin/layout/main',
      extraStyles: 'products.css',
    })
  },

  getProductDetail: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1

      const details = await productService.getProductDetail(req.params.id, page)
      const totalPages = Math.ceil(details[0].totalReviews / productService.reviewsPerPage)

      const product = await productService.getProductById(req.params.id)
      const relatedProducts = await productService.getRelatedProducts(product, req.params.id)

      res.format({
        html: function () {
          res.render('customer/productDetail', {
            details: details[0],
            totalPages,
            activePage: page,
            totalRelatedProducts: relatedProducts.length,
            relatedProducts,
            layout: 'customer/layout/main',
            extraStyles: 'productDetail.css',
          })
        },
        json: function () {
          res.json({
            details: details[0],
            totalPages,
            activePage: page,
          });
        }
      });
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  },

  addReview: async (req, res) => {
    try {
      const product = await productService.getProductById(req.params.id)
      // console.log(req.user)
      const reviewer = await userService.getUserById(req.user.id)
      // console.log(reviewer)
      const reviewedProduct = await productService.addReview(product, req.body, reviewer)
      // console.log(reviewedProduct)
      res.status(200).json(reviewedProduct)
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  }
}
module.exports = productController
