const productService = require('../services/productService')
const colorService = require('../services/colorService')
const sizeService = require('../services/sizeService')
const categoryService = require('../services/categoryService')
const manufacturerService = require('../services/manufacturerService')

const productController = {
  //GET all products
  getAllProducts: async (req, res) => {
    try {
      const products = await productService.getAllProducts()
      if (!products) {
        return res.status(500).json(err)
      }
      res.status(200).json(products)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  //ADD product 
  addProduct: async (req, res) => {
    try {
      const color = await colorService.findColorByName(req.body.color)
      const size = await sizeService.getSizeByName(req.body.size)
      const category = await categoryService.getCategoryByName(req.body.category)
      const manufacturer = await manufacturerService.getManufacturerByName(req.body.manufacturer)
      const savedProduct = await productService.addProduct(req.body, color, size, category, manufacturer)
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
}
module.exports = productController
