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
      const acceptHeader = req.get('Accept');
  
      if (acceptHeader && acceptHeader.includes('application/json')) {
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
      }
      else {
        const categories = await categoryService.getAllCategories()
        const manufacturers = await manufacturerService.getAllManufacturers()
        const colors = await colorService.getAllColors()
        const sizes = await sizeService.getAllSizes()

        res.render('products', {
          categories,
          manufacturers,
          colors,
          sizes,
          layout: 'main',
          extraStyles: 'products.css',
        });
      }
      } catch (err) {
        res.status(500).json(err)
      }
  },


  //ADD product
  addProduct: async (req, res) => {
    try {
      const product = {...req.body,
                        cates: JSON.parse(req.body.cates),
                        colors: JSON.parse(req.body.colors),
                        sizes: JSON.parse(req.body.sizes),
                        photos: JSON.parse(req.body.photos)
                      }
      const savedProduct = await productService.addProduct(product)

      res.status(200).json(savedProduct)
    } catch (err) {
      console.log(err)
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

  getAdminProductPage: async (req, res) => {
    res.render('products', {
      layout: 'main',
      extraStyles: 'products.css',
    })
  },
}
module.exports = productController
