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
      const { 'product-name': productName, category, manufacturer, 'from-input': priceMin, 'to-input': priceMax, page, sort } = req.query;

      const pageTo = parseInt(page) || 1

      var products
      var totalProducts
      var totalPages

      if(sort && sort != 'none') {
        products = await productService.sortProducts(sort, pageTo)
        totalProducts = await productService.getTotalProducts()
        totalPages = Math.ceil(totalProducts / productService.productsPerPage)
      }
      else {
        const conditions = {}
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

        if(conditions) {
          products = await productService.getProductByFilter(conditions, pageTo)
          totalProducts = await productService.getTotalFilteredProducts(conditions)
          totalPages = Math.ceil(totalProducts / productService.productsPerPage)
        }
        else {
          products = await productService.getProducts(pageTo)
        }
      }

      const categories = await categoryService.getAllCategories()
      const manufacturers = await manufacturerService.getAllManufacturers()

      res.format({
        html: function () {
          res.render('productList', {
            categories,
            manufacturers,
            products,
            totalPages,
            activePage: pageTo,
            layout: 'main',
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
    }
  },

  //SORT products
  sortProducts: async (req, res) => {
    try{
      const { sort } = req.query;
      const products = await productService.sortProducts(sort)
      res.status(200).json(products)

    } catch(err){
      res.status(500).json(err)
    }
  },

  //Get related products
  getRelatedProducts: async(req, res) => {
    try{
      const page = parseInt(req.query.page) || 1
      const product = await productService.getProductById(req.params.id)
      const relatedProducts = await productService.getRelatedProducts(product, req.params.id)
      res.status(200).json(relatedProducts)
    } catch(err){
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

  getProductDetail: async (req, res) => {
    try {
      const details = await productService.getProductDetail(req.params.id)

      res.render('productDetail', {
        details,
        layout: 'main',
        extraStyles: 'productDetail.css',
        user: req.user || null,
      })

      // res.format({
      //   html: function () {
      //     res.render('productDetail', {
      //       details,
      //       layout: 'main',
      //       extraStyles: 'productDetail.css',
      //       user: req.user || null,
      //     })
      //   },
      //   json: function () {
      //     res.json({
      //       details,
      //       user: req.user || null,
      //     });
      //   }
      // });
    } catch (err) {
      res.status(500).json(err)
    }
  },
}
module.exports = productController
