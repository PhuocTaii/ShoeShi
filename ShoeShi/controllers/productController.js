const productService = require('../services/productService')

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
      const savedProduct = await productService.addProduct(req.body)
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
