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
      const { 'product-name': productName, category, manufacturer, page, sort } = req.query;
      const pageTo = parseInt(page) || 1

      const products = await productService.getProductsWithCondition(pageTo, productName, category, manufacturer, sort)
      const totalProducts = await productService.getTotalProductsWithCondition(pageTo, productName, category, manufacturer, sort)
      const amountProduct = totalProducts[0] ? totalProducts[0].totalCount : 0
      const totalPages = Math.ceil(amountProduct / productService.productsPerPage)
      res.json({
        products,
        totalPages,
        activePage: pageTo
      });
      } catch (err) {
        res.status(500).json(err)
      }
  },

  getProductPage: async (req, res) => {
    try{
      const categories = await categoryService.getAllCategories()
      const manufacturers = await manufacturerService.getAllManufacturers()
      const colors = await colorService.getAllColors()
      const sizes = await sizeService.getAllSizes()
      const { 'product-name': productName, category, manufacturer, page, sort } = req.query;
      const pageTo = parseInt(page) || 1

      const products = await productService.getProductsWithCondition(pageTo, productName, category, manufacturer, sort)
      const totalProducts = await productService.getTotalProductsWithCondition(pageTo, productName, category, manufacturer, sort)
      const amountProduct = totalProducts[0] ? totalProducts[0].totalCount : 0
      const totalPages = Math.ceil(amountProduct / productService.productsPerPage)
      res.render('products', {
        categories,
        manufacturers,
        colors,
        sizes,
        layout: 'main',
        extraStyles: 'products.css',
        user: req.user,
        products,
        totalPages,
        activePage: pageTo
      });
    } catch (err){
      res.status(500).json(err)
    }
  },

  //ADD product
  addProduct: async (req, res) => {
    try {
      var productImageList = []
      if(req.files){
        for(let i = 0; i < req.files.length; i++) {
          const file = req.files[i]
          const imageUrl = await imageService.uploadImageToCloudinary(file.buffer)
          productImageList.push(imageUrl)
        }
      }
      const product = {name: req.body.name,
                        manufacturer: req.body.manufacturer,
                        price: req.body.price,
                        quantity: req.body.quantity,
                        status: req.body.status,
                        category: JSON.parse(req.body.cates),
                        color: JSON.parse(req.body.colors),
                        size: JSON.parse(req.body.sizes),
                        productImage: productImageList
                      }
      const savedProduct = await productService.addProduct(product)

      res.status(200).json(savedProduct)

    } catch (err) {
      res.status(500).json(err)
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await productService.getProductById(req.params.id)
      res.status(200).json(product)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //UPDATE product
  updateProduct: async (req, res) => {
    try {
      var productImageList = req.body.photos
      if(req.files){
        for(let i = 0; i < req.files.length; i++) {
          const file = req.files[i]
          const imageUrl = await imageService.uploadImageToCloudinary(file.buffer)
          productImageList.push(imageUrl)
        }
      }

      const updatedInfo = {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        price: req.body.price,
        quantity: req.body.quantity,
        status: req.body.status,
        category: JSON.parse(req.body.cates),
        color: JSON.parse(req.body.colors),
        size: JSON.parse(req.body.sizes),
        productImage: productImageList
      }
      
      const product = await productService.updateProduct(
        req.params.id,
        updatedInfo
      )
      res.status(200).json(product)
      
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //DELETE product
  deleteProduct: async (req, res) => {
    try {
      const product = await productService.deleteProduct(req.params.id)
      res.status(200).json('The product has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  },
}
module.exports = productController
