const productService = require('../services/productService')
const colorService = require('../services/colorService')
const sizeService = require('../services/sizeService')
const categoryService = require('../services/categoryService')
const manufacturerService = require('../services/manufacturerService')
const imageService = require('../services/imageService')

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
      const products = await productService.getAllProducts()
      res.render('customer/productList', {
        layout: 'customer/layout/main',
        extraStyles: 'productList.css',
        products: products,
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
}
module.exports = productController
